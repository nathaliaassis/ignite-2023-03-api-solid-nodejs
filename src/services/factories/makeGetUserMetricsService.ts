import { GetUserMetricsService } from '../GetUserMetricsService';
import { PrismaCheckInsRepository } from '@/repositories/prisma/PrismaCheckInsRepository';

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const getUserMetricsService = new GetUserMetricsService(checkInsRepository);

  return getUserMetricsService;
}
