import { Injectable } from '@nestjs/common';
import { SendMailDto } from '../dto/send-mail.dto';
import IMailProvider from '../mail.provider.interface';

@Injectable()
export class TestMailProvider implements IMailProvider {
  public async sendMail(data: SendMailDto): Promise<void> {
    return;
  }
}
