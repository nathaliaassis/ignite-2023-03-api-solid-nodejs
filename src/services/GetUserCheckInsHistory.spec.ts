import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/InMemoryCheckInsRepository';
import { GetUserCheckInsHistoryService } from './GetUserCheckInsHistory';

let checkInsRepository: InMemoryCheckInsRepository;
let getUserCheckInsHistoryService: GetUserCheckInsHistoryService;

describe('@Get User Check Ins Service: ', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    getUserCheckInsHistoryService = new GetUserCheckInsHistoryService(
      checkInsRepository,
    );
  });

  it('should be able to get user check ins history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkIns } = await getUserCheckInsHistoryService.execute({
      userId: 'user-01',
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ]);
  });
});
