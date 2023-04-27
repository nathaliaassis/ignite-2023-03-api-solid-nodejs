import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { GetUserProfileService } from '../GetUserProfileService';

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository();
  const getUserProfileService = new GetUserProfileService(usersRepository);

  return getUserProfileService;
}
