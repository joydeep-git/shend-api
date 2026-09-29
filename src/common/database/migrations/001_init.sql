
CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE OR REPLACE FUNCTION generate_cuid2(
    target_length INT DEFAULT 24
)
RETURNS TEXT AS
$$
DECLARE
    timestamp_part TEXT;
    random_part    TEXT;
    random_length  INT;

    characters TEXT :=
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    result TEXT;
BEGIN
    -- Validate requested length
    IF target_length < 8 THEN
        RAISE EXCEPTION
            'Target length must be at least 8 characters';
    END IF;

    -- Generate timestamp portion
    timestamp_part :=
        LPAD(
            TO_HEX(EXTRACT(EPOCH FROM clock_timestamp())::BIGINT),
            8,
            '0'
        );

    -- Calculate remaining random characters
    random_length :=
        target_length - LENGTH(timestamp_part);

    -- Generate random alphanumeric characters
    random_part := (
        SELECT STRING_AGG(
            SUBSTRING(
                characters,
                FLOOR(1 + RANDOM() * LENGTH(characters))::INT,
                1
            ),
            ''
        )
        FROM generate_series(1, random_length)
    );

    -- Combine timestamp + random portion
    result :=
        LEFT(
            timestamp_part || random_part,
            target_length
        );

    RETURN result;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE IF NOT EXISTS users
(
    id               VARCHAR(30)
        PRIMARY KEY
        DEFAULT generate_cuid2(),

    token            VARCHAR(255) UNIQUE,

    email            TEXT UNIQUE,
    name             TEXT,
    avatar_url       TEXT,

    is_anonymous     BOOLEAN NOT NULL DEFAULT TRUE,
    is_premium       BOOLEAN NOT NULL DEFAULT FALSE,

    ip_address       INET,
    user_agent       TEXT,
    browser          TEXT,
    operating_system TEXT,
    device_type      TEXT,
    language         TEXT,
    timezone         TEXT,

    created_at       TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS files
(
    id                  VARCHAR(30)
        PRIMARY KEY
        DEFAULT generate_cuid2(),

    created_by          VARCHAR(30)
        REFERENCES users(id)
        ON DELETE SET NULL,

    drive_folder_id     TEXT NOT NULL,
    zip_file_id         TEXT,

    file_count          INT DEFAULT 1,
    file_size_bytes     BIGINT NOT NULL,

    single_download     BOOLEAN DEFAULT FALSE,
    download_once_used  BOOLEAN DEFAULT FALSE,

    ttl_minutes         SMALLINT NOT NULL,

    expires_at          TIMESTAMPTZ NOT NULL,

    status              TEXT NOT NULL DEFAULT 'uploading',

    created_at          TIMESTAMPTZ DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ
);


DO
$$
BEGIN

    IF NOT EXISTS
    (
        SELECT 1
        FROM pg_type
        WHERE typname = 'download_status'
    )
    THEN

        CREATE TYPE download_status AS ENUM
        (
            'completed',
            'failed',
            'cancelled'
        );

    END IF;

END
$$;


CREATE TABLE IF NOT EXISTS download_audit
(
    id                  VARCHAR(30)
        PRIMARY KEY
        DEFAULT generate_cuid2(),

    file_id             VARCHAR(30)
        REFERENCES files(id)
        ON DELETE CASCADE,

    download_start      TIMESTAMPTZ
        NOT NULL
        DEFAULT NOW(),

    download_end        TIMESTAMPTZ,

    status              download_status
        NOT NULL
        DEFAULT 'completed',

    ip_address          INET,

    user_agent          TEXT,
    browser             TEXT,
    operating_system    TEXT,
    device_type         TEXT,
    language            TEXT,
    timezone            TEXT
);


CREATE INDEX IF NOT EXISTS idx_files_created_by
    ON files(created_by);

CREATE INDEX IF NOT EXISTS idx_files_expires_at
    ON files(expires_at);

CREATE INDEX IF NOT EXISTS idx_download_audit_file_id
    ON download_audit(file_id);

CREATE INDEX IF NOT EXISTS idx_users_last_seen_anonymous
    ON users(last_seen_at)
    WHERE is_anonymous = TRUE;
