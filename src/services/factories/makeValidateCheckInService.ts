import { PrismaCheckInsRepository } from '@/repositories/prisma/PrismaCheckInsRepository';
import { ValidateCheckInService } from '../ValidateCheckInService';

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const validateCheckInService = new ValidateCheckInService(checkInsRepository);

  return validateCheckInService;
}
