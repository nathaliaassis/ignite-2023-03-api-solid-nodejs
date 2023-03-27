import { IUsersRepository } from '@/repositories/prisma/interfaces/IUsersRespository';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

interface IGetUserProfileServiceRequest {
  userId: string;
}

interface IGetUserProfileServiceResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileServiceRequest): Promise<IGetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
