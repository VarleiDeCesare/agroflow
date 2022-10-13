import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function DeviceHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'deviceId',
      description: 'device único do dispotivo',
      required: false,
    }),
    ApiHeader({
      name: 'os',
      description: 'Sistema operacional do dispositivo',
      required: false,
    }),
    ApiHeader({
      name: 'version',
      description: 'Versão do aplicativo',
      required: false,
    }),
  );
}
