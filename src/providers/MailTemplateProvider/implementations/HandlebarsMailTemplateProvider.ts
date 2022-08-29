import handlebars from 'handlebars';
import { promises } from 'fs';
import IMailTemplateProvider from '../mail-template-provider.interface';
import { ParseMailDto } from '../dto/parse-mail.dto';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: ParseMailDto): Promise<string> {
    const template = await promises.readFile(file, { encoding: 'utf-8' });

    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
