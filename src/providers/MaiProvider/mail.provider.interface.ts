import { SendMailDto } from './dto/send-mail.dto';

export default interface IMailProvider {
  /**
   * Envia email.
   *
   * @param {data} SendMailDto
   * @return {Promise<void>} Void
   */
  sendMail(data: SendMailDto): Promise<void>;
}
