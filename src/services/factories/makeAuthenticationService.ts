import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { AuthenticationService } from '../AuthenticationService';

export function makeAuthenticationService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticationService = new AuthenticationService(usersRepository);

  return authenticationService;
}
