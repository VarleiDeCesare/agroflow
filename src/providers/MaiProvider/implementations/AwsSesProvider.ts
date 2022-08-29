import { Injectable, Inject } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { createTransport, Transporter } from 'nodemailer';
import IMailProvider from '../mail.provider.interface';
import { SendMailDto } from '../dto/send-mail.dto';
import { mailConfig } from 'src/config/mail.config';
import IMailTemplateProvider from 'src/providers/MailTemplateProvider/mail-template-provider.interface';

@Injectable()
class AwsSesProvider implements IMailProvider {
  private readonly ses: aws.SES;

  private readonly transporter: Transporter;

  constructor(
    @Inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    aws.config.update({
      accessKeyId: mailConfig.ses.accessKeyId,
      secretAccessKey: mailConfig.ses.secretAccessKey,
      region: mailConfig.ses.region,
    });

    this.ses = new aws.SES({
      apiVersion: '2010-12-01',
      region: mailConfig.ses.region,
    });

    this.transporter = createTransport({
      SES: { ses: this.ses, aws },
      sendingRate: 1,
    });
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: SendMailDto): Promise<void> {
    await this.transporter.sendMail({
      from,
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}

export default AwsSesProvider;
