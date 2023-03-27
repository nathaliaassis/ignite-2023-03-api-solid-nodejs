import { InMemoryUsersRepository } from '@/repositories/in-memory/InMemoryUsersRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateService } from './AuthenticateService';
import { InvalidCredentialsError } from './errors/InvalidCredentialsError';
import { hash } from 'bcryptjs';

let usersRepository: InMemoryUsersRepository;
let authenticateService: AuthenticateService;

describe('@Authenticate Service: ', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    authenticateService = new AuthenticateService(usersRepository);

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });
  });

  it('should be able to authenticate user', async () => {
    const { user } = await authenticateService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.email).toEqual('johndoe@example.com');
  });

  it('should not be able to authenticate user with an non existent email', async () => {
    const authentication = authenticateService.execute({
      email: 'nonExistentEmail@example.com',
      password: '123456',
    });

    await expect(authentication).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });

  it('should not be able to authenticate user with an wrong password', async () => {
    const authentication = authenticateService.execute({
      email: 'johndoe@example.com',
      password: 'wrongpassword',
    });

    await expect(authentication).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    );
  });
});
