import { InMemoryUsersRepository } from '@/repositories/in-memory/InMemoryUsersRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { GetUserProfileService } from './GetUserProfileService';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

let usersRepository: InMemoryUsersRepository;
let getUserProfileService: GetUserProfileService;

describe('@Get User Profile Service: ', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileService = new GetUserProfileService(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await getUserProfileService.execute({
      userId: createdUser.id,
    });

    expect(user.email).toEqual('johndoe@example.com');
  });

  it('should not be able to get user profile of a non existent id', async () => {
    const profileGet = getUserProfileService.execute({
      userId: 'non-existent-id',
    });

    await expect(profileGet).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
