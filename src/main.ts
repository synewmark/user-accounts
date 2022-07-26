import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';


async function bootstrap() {
  const redis = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });
  const app = await NestFactory.create(AppModule);
  await redis.listen();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
