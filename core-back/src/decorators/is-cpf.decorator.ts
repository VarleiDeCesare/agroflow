import { registerDecorator } from 'class-validator';
import isValidCpf from '../utils/is-valid-cpf.utils';

export function IsCpf() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: { message: 'must be a valid cpf' },
      validator: {
        validate(value: any) {
          return isValidCpf(value);
        },
      },
    });
  };
}
