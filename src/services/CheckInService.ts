import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/prisma/interfaces/ICheckInsRepository';
import { IGymsRepository } from '@/repositories/prisma/interfaces/IGymsRepository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { getDistanceBetweenCoordinates } from 'utils/getDistanceBetweenCoordinates';
import { MaxDistanceError } from './errors/MaxDistanceError';
import { MaxNumberOfCheckInsError } from './errors/MaxNumberOfCheckInsError';

interface ICheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const userCoordinates = {
      latitude: userLatitude,
      longitude: userLongitude,
    };

    const gymCoordinates = {
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber(),
    };

    const distance = getDistanceBetweenCoordinates(
      userCoordinates,
      gymCoordinates,
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError();
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
