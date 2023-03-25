import { Prisma, CheckIn } from '@prisma/client';
import { ICheckInsRepository } from './interfaces/ICheckInsRepository';

export class CheckInsRepository implements ICheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    throw new Error('Method not implemented.');
  }
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.');
  }
}
