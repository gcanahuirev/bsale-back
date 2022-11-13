import { fastifyHelmet } from '@fastify/helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { initSwagger } from '../app.swagger';

import { RootModule } from './di/root.module';

import { PrismaService } from '../infrastructure/prismaorm/prisma.service';

const fastifyOpts = {
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        levelFirst: true,
        translateTime: 'SYS:dd-mm-yyyy h:MM:ss TT Z',
        ignore: 'pid,hostname',
        colorize: true,
      },
      level: 'debug',
    },
  },
};

export class ServerApplication {
  public async run() {
    const logger = new Logger();

    const app = await NestFactory.create<NestFastifyApplication>(
      RootModule,
      new FastifyAdapter(fastifyOpts),
      {
        logger: ['error', 'warn', 'debug', 'verbose', 'log'],
      },
    );

    /* ======= LOAD CONFIG .ENV.* ======= */
    const config: ConfigService<Record<string, unknown>> =
      app.get(ConfigService);

    /* ======= SET PREFIX END_POINT ======= */
    app.setGlobalPrefix('api/v1');

    /* ======= ENABLE HELMET ======= */
    await app.register(fastifyHelmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'cdn.jsdelivr.net',
            'fonts.googleapis.com',
          ],
          fontSrc: [`'self'`, 'fonts.gstatic.com'],
          imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
        },
      },
    });

    /* ======= ENABLE CORS ======= */
    app.enableCors();

    /* ======= VALIDATE PIPE (USE DTOs) ======= */
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    /* ======= INIT SWAGGER ======= */
    if (process.env.NODE_ENV !== 'production') {
      initSwagger(app);
    }

    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);

    await app.listen(config.get<number>('api.port'), '0.0.0.0');

    if (process.env.NODE_ENV !== 'production') {
      logger.debug(
        `Swagger document generated ${await app.getUrl()}/api/v1/docs`,
        'Swagger',
      );
    }
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
