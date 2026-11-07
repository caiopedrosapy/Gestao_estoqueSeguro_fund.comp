
import { Controller, Get, Query } from '@nestjs/common';
import { ClimaService } from './clima.service.js';

@Controller('clima')
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

  @Get()
  consultar(@Query('municipio') municipio?: string) {
    return this.climaService.consultarMunicipio(
      municipio || 'Palmares',
    );
  }
}