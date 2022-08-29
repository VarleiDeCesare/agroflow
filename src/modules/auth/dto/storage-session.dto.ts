export class StorageSessionDto {
  user_id: string;
  email: string;
  access_token?: string;
  access_token_expires_at?: Date;
  refresh_token?: string;
  refresh_token_expires_at?: Date;
  deviceId?: string;
  os?: string;
  version?: string;
  login_code?: string;
  login_code_expires_at?: Date;
  forgot_password_token?: string;
  forgot_password_token_expires_at?: Date;
}
