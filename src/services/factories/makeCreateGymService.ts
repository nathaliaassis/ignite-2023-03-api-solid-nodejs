import { PrismaGymsRepository } from '@/repositories/prisma/PrismaGymsRepoository';
import { CreateGymService } from '../CreateGymService';

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository();

  const createGymService = new CreateGymService(gymsRepository);

  return createGymService;
}
