
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClimaModule } from '../clima/clima.module.js';
import { Alerta } from './entities/alerta.entity.js';
import { AlertasController } from './alertas.controller.js';
import { AlertasService } from './alertas.service.js';
import { AvisoChuvaService } from './aviso-chuva.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Alerta]), ClimaModule],
  controllers: [AlertasController],
  providers: [AlertasService, AvisoChuvaService],
})
export class AlertasModule {}
