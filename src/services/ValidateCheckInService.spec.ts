import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/InMemoryCheckInsRepository';
import { ValidateCheckInService } from './ValidateCheckInService';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { LateCheckInValidationError } from './errors/LateCheckInValidationError';

let checkInsRepository: InMemoryCheckInsRepository;
let validateCheckInService: ValidateCheckInService;

describe('@Validate Check In Service: ', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    validateCheckInService = new ValidateCheckInService(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate check in ', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });
    const { checkIn } = await validateCheckInService.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate a non existent check in ', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await expect(() =>
      validateCheckInService.execute({
        checkInId: 'non-existent-check-in',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate check in after 20 minutes it has been created', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21; // 21 minutes

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      validateCheckInService.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
