import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export function databaseError(error: unknown): never {
  if (error instanceof QueryFailedError) {
    const driver = error.driverError as { code?: string };

    if (driver.code === '23503' || driver.code === '23001') {
      throw new ConflictException(
        'Operação impedida por vínculos com outros registros.',
      );
    }
  }

  throw error;
}