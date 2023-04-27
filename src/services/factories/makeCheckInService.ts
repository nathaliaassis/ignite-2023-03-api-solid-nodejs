import { CheckInService } from '../CheckInService';
import { PrismaGymsRepository } from '@/repositories/prisma/PrismaGymsRepoository';
import { PrismaCheckInsRepository } from '@/repositories/prisma/PrismaCheckInsRepository';

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const checkInService = new CheckInService(checkInsRepository, gymsRepository);

  return checkInService;
}
