import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as fs from 'fs';
import Helmet from 'helmet';
import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
const xss = require('xss-clean');

const PORT = process.env.PORT || 4000;

const httpsOptions = {
  key: fs.readFileSync('./secrets/key.pem'),
  cert: fs.readFileSync('./secrets/certificate.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors({
    credentials: true,
    origin: `${process.env.ORIGIN_FE}`,
  });

  app.use(Helmet());
  app.useGlobalPipes(new ValidationPipe());
  // app.use(csurf());
  app.use(xss());

  await app.listen(PORT, () => {
    console.log(`runing on port ${PORT}`);
  });
}

bootstrap();
