import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  Transporter,
} from 'nodemailer';

import { Injectable, Inject } from '@nestjs/common';
import IMailProvider from '../mail.provider.interface';
import { SendMailDto } from '../dto/send-mail.dto';
import IMailTemplateProvider from 'src/providers/MailTemplateProvider/mail-template-provider.interface';

@Injectable()
export default class EtheralMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor(
    @Inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    createTestAccount((err, account) => {
      if (err) return;
      this.transporter = createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: SendMailDto): Promise<void> {
    const info = await this.transporter.sendMail({
      from,
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', getTestMessageUrl(info));
  }
}
