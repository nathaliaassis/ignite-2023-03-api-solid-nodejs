import { GetUserCheckInsHistoryService } from '../GetUserCheckInsHistoryService';
import { PrismaCheckInsRepository } from '@/repositories/prisma/PrismaCheckInsRepository';

export function makeGetUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const getUserCheckInsHistoryService = new GetUserCheckInsHistoryService(
    checkInsRepository,
  );

  return getUserCheckInsHistoryService;
}
            