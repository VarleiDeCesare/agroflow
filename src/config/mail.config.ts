export const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'etheral',
  template: 'handlebars',
  defaults: {
    from: {
      address: process.env.MAIL_EMAIL || 'backend@corebiz.ag',
      name: process.env.ENTERPRISE_NAME || 'Corebiz',
    },
  },
  ses: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
    secure: Boolean(process.env.SMTP_SECURE),
    user: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
};
