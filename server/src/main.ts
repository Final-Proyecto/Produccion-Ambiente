import { NestFactory } from '@nestjs/core';
import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { AppModule } from './app.module';
import morgan from 'morgan';
import cookieparser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.use(cookieparser());
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const messages = validationErrors.flatMap((error) =>
          Object.values(error.constraints || {}).map(
            (msg) => `${error.property}: ${msg}`,
          ),
        );
        return new BadRequestException(messages);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
