
import { Module } from '@nestjs/common';
import { ClimaController } from './clima.controller.js';
import { ClimaService } from './clima.service.js';

@Module({
  controllers: [ClimaController],
  providers: [ClimaService],
})
export class ClimaModule {}