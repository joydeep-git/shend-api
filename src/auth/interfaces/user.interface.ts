

export interface UserDataType {
  id: string;
  token: string | null;
  email: string | null;
  name: string | null;
  avatar_url: string | null;

  is_anonymous: boolean;
  is_premium: boolean;

  ip_address: string | null;
  user_agent: string | null;
  browser: string | null;
  operating_system: string | null;
  device_type: string | null;
  language: string | null;
  timezone: string | null;

  created_at: Date;
  last_seen_at: Date;
}

export interface CreateAuthUserType {

  email: string;
  name: string;
  avatar_url: string;

  ip_address: string;
  user_agent: string;
  browser: string;
  operating_system: string;
  device_type: string;
  language: string;
  timezone: string;
}

export interface CreateAnonymousUserType {
  ip_address: string;
  user_agent: string;
  browser: string;
  operating_system: string;
  device_type: string;
  language: string;
  timezone: string;
}
