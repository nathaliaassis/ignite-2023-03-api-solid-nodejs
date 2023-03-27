import { IGymsRepository } from '@/repositories/prisma/interfaces/IGymsRepository';
import { Gym } from '@prisma/client';

interface IGetNearbyGymsServiceResquest {
  userLatitude: number;
  userLongitude: number;
}

interface IGetNearbyGymsServiceResponse {
  gyms: Gym[];
}

export class GetNearbyGymsService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IGetNearbyGymsServiceResquest): Promise<IGetNearbyGymsServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
