import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { EmailAlreadyExistsError } from '@/services/errors/EmailAlreadyExistsError';
import { makeRegisterService } from '@/services/factories/makeRegisterService';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const registerService = makeRegisterService();

  try {
    await registerService.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.code(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}
