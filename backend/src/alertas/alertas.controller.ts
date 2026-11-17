
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';

import { AvisoChuvaService } from './aviso-chuva.service.js';
import { IdPipe } from '../common/id.pipe.js';
import { AlertasService } from './alertas.service.js';
import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
import { QueryAlertaDto } from './dto/query-alerta.dto.js';

@Controller('alertas')
export class AlertasController {
  constructor(
    private readonly service: AlertasService,
    private readonly avisoChuvaService: AvisoChuvaService,
  ) { }

  @Post()
  create(@Body() dto: CreateAlertaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryAlertaDto) {
    return this.service.findAll(query);
  }

  // Nova rota: consultar avisos de chuva da APAC
  @Get('chuva')
  consultarAvisosChuva(
    @Query('municipio') municipio?: string,
    @Query('periodo') periodo?: string,
  ) {
    return this.avisoChuvaService.consultarAvisos(
      municipio || 'Palmares',
      periodo === undefined ? 1 : Number(periodo),
    );
  }

  @Get(':id/produtos-em-risco')
  produtosEmRisco(@Param('id', IdPipe) id: number) {
    return this.service.produtosEmRisco(id);
  }

  @Get(':id')
  findOne(@Param('id', IdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IdPipe) id: number, @Body() dto: UpdateAlertaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', IdPipe) id: number) {
    return this.service.remove(id);
  }
}
