import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/PrismaUsersRepository';
import { AuthenticationService } from '@/services/AuthenticationService';
import { InvalidCredentialsError } from '@/services/errors/InvalidCredentialsError';

export async function authentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticationBodySchema.parse(request.body);

  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticationService = new AuthenticationService(
    prismaUsersRepository,
  );

  try {
    await authenticationService.execute({
      email,
      password,
    });
    1;
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.code(400).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(200).send();
}
