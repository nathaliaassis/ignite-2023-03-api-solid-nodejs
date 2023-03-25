import { InMemoryUsersRepository } from '@/repositories/in-memory/InMemoryUsersRepository';
import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterService } from './RegisterService';
import { compare } from 'bcryptjs';
import { EmailAlreadyExistsError } from './errors/EmailAlreadyExistsError';

let usersRepository: InMemoryUsersRepository;
let registerService: RegisterService;

describe('@Register Service:', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerService = new RegisterService(usersRepository);
  });

  it('should create an user', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password', async () => {
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await registerService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(() =>
      registerService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });
});
