CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS schema_migrations (
    version      VARCHAR(50) PRIMARY KEY,
    executed_at  TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS authenticated_users (
    id              VARCHAR(10) PRIMARY KEY,
    google_id       TEXT UNIQUE NOT NULL,
    email           TEXT UNIQUE NOT NULL,
    name            TEXT NOT NULL,
    avatar_url      TEXT,

    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    last_login_at   TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS files (
    id                  VARCHAR(10) PRIMARY KEY,

    created_by          VARCHAR(10)
        REFERENCES authenticated_users(id)
        ON DELETE SET NULL,

    anonymous_ip        INET,
    anonymous_device    TEXT,

    drive_folder_id     TEXT NOT NULL,
    zip_file_id         TEXT,

    file_count          INT DEFAULT 1,
    file_size_bytes     BIGINT NOT NULL,

    single_download     BOOLEAN DEFAULT FALSE,
    download_once_used  BOOLEAN DEFAULT FALSE,

    is_paid_share       BOOLEAN DEFAULT FALSE,

    ttl_minutes         SMALLINT NOT NULL,

    expires_at          TIMESTAMPTZ NOT NULL,

    status              TEXT NOT NULL DEFAULT 'uploading',

    created_at          TIMESTAMPTZ DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ
);



CREATE TABLE IF NOT EXISTS downloads (
    id              BIGSERIAL PRIMARY KEY,

    file_id         VARCHAR(10)
        REFERENCES files(id)
        ON DELETE CASCADE,

    user_id         VARCHAR(10)
        REFERENCES authenticated_users(id)
        ON DELETE SET NULL,

    ip_address      INET NOT NULL,

    user_agent      TEXT,

    downloaded_at   TIMESTAMPTZ DEFAULT NOW()
);


CREATE INDEX IF NOT EXISTS idx_files_expires_at
ON files(expires_at);

CREATE INDEX IF NOT EXISTS idx_files_created_by
ON files(created_by);

CREATE INDEX IF NOT EXISTS idx_downloads_file
ON downloads(file_id);