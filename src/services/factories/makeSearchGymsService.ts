import { PrismaGymsRepository } from '@/repositories/prisma/PrismaGymsRepoository';
import { SearchGymsService } from '../SearchGymsService';

export function makeSearchGymService() {
  const gymsRepository = new PrismaGymsRepository();

  const searchGymService = new SearchGymsService(gymsRepository);

  return searchGymService;
}
