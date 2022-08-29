import { mailConfig } from 'src/config/mail.config';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const mailTemplateProviders = {
  handlebars: HandlebarsMailTemplateProvider,
};

export default mailTemplateProviders[mailConfig.template];
