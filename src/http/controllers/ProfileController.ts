import { makeGetUserProfileService } from '@/services/factories/makeGetUserProfileService';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileService = makeGetUserProfileService();

  const { user } = await getUserProfileService.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  });
}
