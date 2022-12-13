const authConfig = {
  secret: process.env.JWT_SECRET,
  jwt: {
    expiresIn: Number(process.env.JWT_EXPIRES_IN || 24 * 60 * 60),
  },
};

export default authConfig;
