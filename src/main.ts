if (process.env.NODE_ENV !== 'production') {
  import('dotenv/config');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(process.env.APP_PORT || 3000, () => {
    console.log(
      `\nServer running at http://localhost:${process.env.APP_PORT || 3000}`,
    );
  });
}

bootstrap();
