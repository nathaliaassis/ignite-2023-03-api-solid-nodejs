import { IUsersRepository } from '@/repositories/prisma/interfaces/IUsersRespository';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';

interface IAuthenticationServiceRequest {
  email: string;
  password: string;
}

interface IAuthenticationServiceRespose {
  user: User;
}

export class AuthenticationService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticationServiceRequest): Promise<IAuthenticationServiceRespose> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordsMatch = await compare(password, user.password_hash);

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
