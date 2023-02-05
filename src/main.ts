import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = yaml.load(
    readFileSync(join(__dirname, '..', 'doc', 'api.yaml'), 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
