import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/InMemoryGymsRepository';
import { SearchGymsService } from './SearchGymsService';
import { GetNearbyGymsService } from './GetNearbyGymsService';

let gymsRepository: InMemoryGymsRepository;
let getNearbyGymsService: GetNearbyGymsService;

describe('@Get Nearby Gyms Service: ', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    getNearbyGymsService = new GetNearbyGymsService(gymsRepository);
  });

  it('should be able to get nearby gyms', async () => {
    // nearby gym
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'new-gym-description',
      phone: '1234567890',
      latitude: -15.647929,
      longitude: -47.797788,
    });

    // Far gym
    await gymsRepository.create({
      title: 'Far Gym',
      description: 'new-gym-description',
      phone: '1234567890',
      latitude: -15.61866,
      longitude: -47.632273,
    });

    const { gyms } = await getNearbyGymsService.execute({
      userLatitude: -15.647929,
      userLongitude: -47.797788,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
