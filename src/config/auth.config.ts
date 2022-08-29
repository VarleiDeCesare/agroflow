const authConfig = {
  secret: process.env.JWT_SECRET,
  jwt: {
    // em segundos
    expiresIn: Number(process.env.JWT_EXPIRES_IN || 24 * 60 * 60),
  },
  refreshToken: {
    // em segundos
    expiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || 48 * 60 * 60),
  },
  storage: {
    provider: process.env.SESSION_STORAGE_PROVIDER,
    redis: {
      url: process.env.SESSION_REDIS_URL,
    },
  },
  loginCode: {
    // em segundos
    expiresIn: Number(process.env.LOGIN_CODE_EXPIRES_IN || 30 * 60),
  },
  forgotPasswordToken: {
    // em segundos
    expiresIn: Number(process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN || 30 * 60),
    frontUrl: process.env.FORGOT_PASSWORD_FRONT_URL,
  },
};

export default authConfig;
