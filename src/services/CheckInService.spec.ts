import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInService } from './CheckInService';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/InMemoryCheckInsRepository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/InMemoryGymsRepository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxDistanceError } from './errors/MaxDistanceError';
import { MaxNumberOfCheckInsError } from './errors/MaxNumberOfCheckInsError';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInService: CheckInService;

describe('@Check In Service: ', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    checkInService = new CheckInService(checkInsRepository, gymsRepository);

    vi.useFakeTimers();

    await gymsRepository.create({
      id: 'gym-01',
      title: 'new-gym',
      description: 'new-gym-description',
      phone: '1234567890',
      latitude: -15.618263,
      longitude: -47.660239,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in ', async () => {
    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.618263,
      userLongitude: -47.660239,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should nreturn an erro if gym does not exist', async () => {
    vi.setSystemTime(new Date(2023, 2, 25, 8, 0, 0));
    await expect(() =>
      checkInService.execute({
        gymId: 'non-existent-gym',
        userId: 'user-01',
        userLatitude: -15.618263,
        userLongitude: -47.660239,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 2, 25, 8, 0, 0));
    await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.618263,
      userLongitude: -47.660239,
    });

    await expect(() =>
      checkInService.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -15.618263,
        userLongitude: -47.660239,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2023, 2, 20, 8, 0, 0));
    await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.618263,
      userLongitude: -47.660239,
    });

    vi.setSystemTime(new Date(2023, 2, 21, 8, 0, 0));

    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.618263,
      userLongitude: -47.660239,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in distant gym', async () => {
    //creating a new gym
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'TS Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-15.6557633),
      longitude: new Decimal(-47.7933586),
    });

    await expect(() =>
      checkInService.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -15.618263,
        userLongitude: -47.660239,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
