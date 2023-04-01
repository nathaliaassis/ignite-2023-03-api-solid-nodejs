import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/InMemoryCheckInsRepository';
import { ValidateCheckInService } from './ValidateCheckInService';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

let checkInsRepository: InMemoryCheckInsRepository;
let validateCheckInService: ValidateCheckInService;

describe('@Validate Check In Service: ', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    validateCheckInService = new ValidateCheckInService(checkInsRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
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
});
