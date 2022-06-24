import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import Helmet from 'helmet';
import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
const xss = require('xss-clean');

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Helmet());
  app.useGlobalPipes(new ValidationPipe());
  // app.use(csurf());
  app.use(xss());

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });

  await app.listen(PORT, () => {
    console.log(`runing on port ${PORT}`);
  });
}

bootstrap();
