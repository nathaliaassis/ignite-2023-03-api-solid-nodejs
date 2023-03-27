import { ICheckInsRepository } from '@/repositories/prisma/interfaces/ICheckInsRepository';

interface IGetUserMetricsServiceRequest {
  userId: string;
}

interface IGetUserMetricsServiceResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsServiceRequest): Promise<IGetUserMetricsServiceResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
