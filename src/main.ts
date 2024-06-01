import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

// STATIC FILES
import { fastifyStatic } from '@fastify/static';
import { join } from 'path';
import { rootDir } from './utils/rootDir';

import helmet from '@fastify/helmet';

import compress from '@fastify/compress';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        file: 'public/logs/app.log',
      },
    }),
  );

  app.register(fastifyStatic, {
    root: join(rootDir, 'public'),
    prefix: '/public/', // Prefix để truy cập file tĩnh
  });

  app.register(helmet);

  app.register(compress, { encodings: ['gzip', 'deflate'] });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );

  await app.listen(3001);
}
bootstrap();
