import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { AuthenticateService } from '../AuthenticateService';

export function makeAuthenticationService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
