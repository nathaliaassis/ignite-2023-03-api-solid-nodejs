import { prisma } from '@/lib/prisma';
import { IUsersRepository } from '@/repositories/prisma/interfaces/IUsersRespository';
import { hash } from 'bcryptjs';
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError';

interface IRegisterService {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRegisterService) {
    console.log('inside service', name, email, password);
    const password_hash = await hash(password, 6);

    const emailIsAlreadyRegistered = await this.usersRepository.findByEmail(
      email,
    );

    if (emailIsAlreadyRegistered) {
      throw new EmailAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
