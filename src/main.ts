if (process.env.NODE_ENV !== 'production') {
  import('dotenv/config');
}

import { AppModule } from './app/modules/app/app.module';
import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { createTempFolderIfNotExists } from './core/utils/files';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'download/:filename', method: RequestMethod.ALL }],
  });

  await app.listen(process.env.APP_PORT || 3000, () => {
    createTempFolderIfNotExists();

    console.log(
      `\nServer running at http://localhost:${process.env.APP_PORT || 3000}`,
    );
  });
}

bootstrap();
