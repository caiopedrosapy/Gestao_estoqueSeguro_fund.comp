import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { NivelAlerta } from '../entities/alerta.entity.js';

export class CreateAlertaDto {
  @IsInt()
  @Min(1)
  @Max(2147483647)
  estoqueId!: number;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  titulo!: string;

  @IsEnum(NivelAlerta)
  nivel!: NivelAlerta;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  descricao!: string;

  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsBoolean()
  ativo?: boolean;
}
