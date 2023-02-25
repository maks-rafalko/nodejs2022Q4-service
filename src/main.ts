import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import 'dotenv/config';
import { AppLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = yaml.load(
    readFileSync(join(__dirname, '..', 'doc', 'api.yaml'), 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  const loggerService = app.get(AppLogger);

  process.on('uncaughtException', (err, origin) => {
    loggerService.error(`Uncaught exception (listener): ${err}. Exception origin: ${origin}.`)
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggerService.error(`Unhandled Rejection (listener): ${reason}`);
  });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();

