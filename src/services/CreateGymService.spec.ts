import { InMemoryGymsRepository } from '@/repositories/in-memory/InMemoryGymsRepository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateGymService } from './CreateGymService';

let gymsRepository: InMemoryGymsRepository;
let createGymService: CreateGymService;

describe('@Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymService = new CreateGymService(gymsRepository);
  });

  it('should be able to create a new Gym', async () => {
    const { gym } = await createGymService.execute({
      title: 'new-gym',
      description: 'new-gym-description',
      phone: '1234567890',
      latitude: -15.618263,
      longitude: -47.660239,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
