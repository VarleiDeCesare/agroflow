import { Inject, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { mailConfig } from 'src/config/mail.config';
import IMailTemplateProvider from 'src/providers/MailTemplateProvider/mail-template-provider.interface';
import { SendMailDto } from '../dto/send-mail.dto';
import IMailProvider from '../mail.provider.interface';

@Injectable()
export class SmtpProvider implements IMailProvider {
  private readonly transporter: Transporter;

  constructor(
    @Inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    if (
      mailConfig.driver === 'smtp' &&
      (!mailConfig.smtp.host ||
        !mailConfig.smtp.port ||
        !mailConfig.smtp.user ||
        !mailConfig.smtp.password)
    ) {
      throw 'Insira as chaves de SMTP';
    }

    this.transporter = createTransport({
      host: mailConfig.smtp.host,
      port: mailConfig.smtp.port,
      secure: mailConfig.smtp.secure, // upgrade later with STARTTLS
      auth: {
        user: mailConfig.smtp.user,
        pass: mailConfig.smtp.password,
      },
    });
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: SendMailDto): Promise<void> {
    return this.transporter.sendMail({
      from,
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
