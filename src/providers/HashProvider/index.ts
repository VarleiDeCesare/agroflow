import { hashConfig } from '../../config/hash.config';
import BCryptHashProvider from './implementations/BCryptHashProvider';

const hashProviders = {
  bcrypt: BCryptHashProvider,
};

export default hashProviders[hashConfig.provider];
