import { CheckIn } from '@prisma/client';
import { ICheckInsRepository } from '@/repositories/prisma/interfaces/ICheckInsRepository';
import { IGymsRepository } from '@/repositories/prisma/interfaces/IGymsRepository';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { getDistanceBetweenCoordinates } from 'utils/getDistanceBetweenCoordinates';
import { MaxDistanceError } from './errors/MaxDistanceError';
import { MaxNumberOfCheckInsError } from './errors/MaxNumberOfCheckInsError';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/LateCheckInValidationError';

interface IValidateCheckInServiceRequest {
  checkInId: string;
}

interface IValidateCheckInServiceResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInServiceRequest): Promise<IValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
