import { ParseMailDto } from 'src/providers/MailTemplateProvider/dto/parse-mail.dto';
import { MailContactDto } from './mail-contact.dto';

export class SendMailDto {
  from: MailContactDto;
  to: MailContactDto;
  subject: string;
  templateData: ParseMailDto;
}
