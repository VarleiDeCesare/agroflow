import EtheralMailProvider from './implementations/EtheralMailProvider';
import AwsSesProvider from './implementations/AwsSesProvider';
import { mailConfig } from 'src/config/mail.config';
import { SmtpProvider } from './implementations/SmtpProvider';

const mailProvider = {
  etheral: EtheralMailProvider,
  ses: AwsSesProvider,
  smtp: SmtpProvider,
};

export default mailProvider[mailConfig.driver];
