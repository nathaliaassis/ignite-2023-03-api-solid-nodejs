import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/prisma/interfaces/ICheckInsRepository';

interface IGetUserCheckInsHistoryServiceRequest {
  userId: string;
}

interface IGetUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[];
}

export class GetUserCheckInsHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserCheckInsHistoryServiceRequest): Promise<IGetUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId);

    return {
      checkIns,
    };
  }
}
