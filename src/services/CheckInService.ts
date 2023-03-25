import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/prisma/interfaces/ICheckInsRepository';

interface ICheckInServiceRequest {
  userId: string;
  gymId: string;
}

interface ICheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
