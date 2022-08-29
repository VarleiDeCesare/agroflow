import { ParseMailDto } from './dto/parse-mail.dto';

export default interface IMailTemplateProvider {
  /**
   * Parseia um template com variáveis.
   *
   * @param {data} ParseMailDto
   * @return {string} Retorna Promise<string>
   */
  parse(data: ParseMailDto): Promise<string>;
}
