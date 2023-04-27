import { PrismaGymsRepository } from '@/repositories/prisma/PrismaGymsRepoository';
import { GetNearbyGymsService } from '../GetNearbyGymsService';

export function makeGetNearbyGymService() {
  const gymsRepository = new PrismaGymsRepository();

  const getNearbyGymService = new GetNearbyGymsService(gymsRepository);

  return getNearbyGymService;
}
