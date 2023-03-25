import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInService } from './CheckInService';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/InMemoryCheckInsRepository';

let checkInsRepository: InMemoryCheckInsRepository;
let checkInService: CheckInService;

describe('@Check In Service: ', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    checkInService = new CheckInService(checkInsRepository);
  });

  it('should be able to check in ', async () => {
    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it('should be able to create a check in', () => {});
});
