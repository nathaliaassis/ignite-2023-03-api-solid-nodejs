import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { RegisterService } from '@/services/RegisterService';
import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { EmailAlreadyExistsError } from '@/services/errors/EmailAlreadyExistsError';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const prismaUsersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(prismaUsersRepository);

  try {
    await registerService.execute({
      name,
      email,
      password,
    });
    1;
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.code(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}
