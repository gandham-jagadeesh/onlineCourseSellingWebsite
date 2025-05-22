import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe(
    {
      transform:true,
      whitelist:true,
      forbidNonWhitelisted: true,
    }
  ));
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
