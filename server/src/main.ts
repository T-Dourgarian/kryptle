import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://www.kryptle.com",
      "https://kryptle-c85be340ad52.herokuapp.com/"
    ],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
