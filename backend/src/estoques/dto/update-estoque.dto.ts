import { PartialType } from '@nestjs/mapped-types';
import { CreateEstoqueDto } from './create-estoque.dto.js';

export class UpdateEstoqueDto extends PartialType(CreateEstoqueDto, {
  skipNullProperties: false,
}) {}