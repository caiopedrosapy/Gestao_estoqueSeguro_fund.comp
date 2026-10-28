import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertaDto } from './create-alerta.dto.js';

export class UpdateAlertaDto extends PartialType(CreateAlertaDto, {
  skipNullProperties: false,
}) {}
