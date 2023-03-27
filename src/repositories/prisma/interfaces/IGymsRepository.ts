import { Gym, Prisma } from '@prisma/client';

export interface IFindManyNearby {
  latitude: number;
  longitude: number;
}
export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findManyNearby(params: IFindManyNearby): Promise<Gym[]>;
  searchMany(querty: string, page: number): Promise<Gym[]>;
  findById(id: string): Promise<Gym | null>;
}
