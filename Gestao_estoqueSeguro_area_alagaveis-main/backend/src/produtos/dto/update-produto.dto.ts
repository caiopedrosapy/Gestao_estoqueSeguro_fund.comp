import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto.js';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto, {
    skipNullProperties: false,
}) {}
