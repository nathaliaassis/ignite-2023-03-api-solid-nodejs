import { Prisma, CheckIn } from '@prisma/client';
import { ICheckInsRepository } from './interfaces/ICheckinsRepository';

export class CheckInsRepository implements ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.');
  }
}
