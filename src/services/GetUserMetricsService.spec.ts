import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/InMemoryCheckInsRepository';
import { GetUserCheckInsHistoryService } from './GetUserCheckInsHistoryService';
import { GetUserMetricsService } from './GetUserMetricsService';

let checkInsRepository: InMemoryCheckInsRepository;
let getUserMetricsService: GetUserMetricsService;

describe('@Get User Metrics Service: ', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    getUserMetricsService = new GetUserMetricsService(checkInsRepository);
  });

  it('should be able to get check in count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await getUserMetricsService.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
