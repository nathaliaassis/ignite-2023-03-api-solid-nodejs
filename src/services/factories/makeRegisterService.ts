import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { RegisterService } from '../RegisterService';

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(usersRepository);

  return registerService;
}
