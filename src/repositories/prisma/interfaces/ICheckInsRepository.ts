import { CheckIn, Prisma } from '@prisma/client';

export interface ICheckInsRepository {
  findById(id: string): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  countByUserId(userId: string): Promise<number>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
