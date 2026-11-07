
import { NestFactory } from '@nestjs/core';
import { ClimaModule } from './clima/clima.module.js';

async function bootstrap() {
  const app = await NestFactory.create(ClimaModule);

  await app.listen(3001);

  console.log('API climática iniciada em http://localhost:3001');
}

bootstrap();