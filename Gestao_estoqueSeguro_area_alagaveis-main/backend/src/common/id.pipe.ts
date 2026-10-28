import { BadRequestException, Injectable } from '@nestjs/common';
import type { PipeTransform } from '@nestjs/common';

@Injectable()
export class IdPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const id = Number(value);

    if (
      !/^[1-9]\d*$/.test(value) ||
      !Number.isSafeInteger(id) ||
      id > 2147483647
    ) {
      throw new BadRequestException('O ID deve ser um inteiro positivo.');
    }

    return id;
  }
}