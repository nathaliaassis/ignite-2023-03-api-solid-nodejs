import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/InMemoryGymsRepository';
import { SearchGymsService } from './SearchGymsService';

let gymsRepository: InMemoryGymsRepository;
let searchGymsService: SearchGymsService;

describe('@Get User Check Ins Service: ', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    searchGymsService = new SearchGymsService(gymsRepository);
  });

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'JS Gym',
      description: 'new-gym-description',
      phone: '1234567890',
      latitude: -15.618263,
      longitude: -47.660239,
    });

    await gymsRepository.create({
      title: 'TS Gym',
      description: 'new-gym-description',
      phone: '1234567890',
      latitude: -15.618263,
      longitude: -47.660239,
    });

    const { gyms } = await searchGymsService.execute({
      query: 'JS',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Gym' })]);
  });

  it('should be able to return a paginated gym search ', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS Gym ${i}`,
        description: 'new-gym-description',
        phone: '1234567890',
        latitude: -15.618263,
        longitude: -47.660239,
      });
    }

    const { gyms } = await searchGymsService.execute({
      query: 'JS',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS Gym 21' }),
      expect.objectContaining({ title: 'JS Gym 22' }),
    ]);
  });
});
