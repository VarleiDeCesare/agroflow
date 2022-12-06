import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import axios from 'axios';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  //FIXME: Apenas para desenvolvimento
  await app.listen(3001, async () => {
    const axiosInstance = axios.create({
      baseURL: `http://localhost:3001/`,
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNjQxYjcxNC0xMWZjLTQ2MDAtYTg3Yi05NDgxOWRiZjBmN2IiLCJlbWFpbCI6InZhcmxlaUBnbWFpbC5jb20iLCJpYXQiOjE2NzAzMjgyMzIsImV4cCI6MTY3MjkyMDIzMn0.js1iTSx8o2ixr6tcq96yttIzRuBXpAg20_Y3gAmOfZU',
      },
    });

    try {
      const userExists = await axiosInstance.get('users/me');

      if (!userExists.data) {
        try {
          await axiosInstance.post('users', {
            name: 'Varlei',
            surname: 'De Cesare',
            email: 'varlei@gmail.com',
            password: 'Gremio321',
            passwordConfirmation: 'Gremio321',
            cpf: '04075467074',
          });
        } catch (e) {}
      }
    } catch (e) {
      try {
        await axiosInstance.post('users', {
          name: 'Varlei',
          surname: 'De Cesare',
          email: 'varlei@gmail.com',
          password: 'Gremio321',
          passwordConfirmation: 'Gremio321',
          cpf: '04075467074',
        });
      } catch (e) {}
    }
  });
}
bootstrap();
