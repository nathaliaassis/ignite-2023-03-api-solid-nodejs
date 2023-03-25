import { IUsersRepository } from '@/repositories/prisma/interfaces/IUsersRespository';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

interface IProfileServiceRequest {
  userId: string;
}

interface IProfileServiceRespose {
  user: User;
}

export class ProfileService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IProfileServiceRequest): Promise<IProfileServiceRespose> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
