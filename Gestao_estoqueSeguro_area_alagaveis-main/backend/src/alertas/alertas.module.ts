import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alerta } from './entities/alerta.entity.js';
import { AlertasController } from './alertas.controller.js';
import { AlertasService } from './alertas.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Alerta])],
  controllers: [AlertasController],
  providers: [AlertasService],
})
export class AlertasModule {}
