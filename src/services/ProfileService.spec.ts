import { InMemoryUsersRepository } from '@/repositories/in-memory/InMemoryUsersRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticationService } from './AuthenticationService';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { hash } from 'bcryptjs';
import { ProfileService } from './ProfileService';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

let usersRepository: InMemoryUsersRepository;
let profileService: ProfileService;

describe('@Profile Service: ', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    profileService = new ProfileService(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await profileService.execute({
      userId: createdUser.id,
    });

    expect(user.email).toEqual('johndoe@example.com');
  });

  it('should not be able to get user profile of a non existent id', async () => {
    const profileGet = profileService.execute({
      userId: 'non-existent-id',
    });

    await expect(profileGet).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
