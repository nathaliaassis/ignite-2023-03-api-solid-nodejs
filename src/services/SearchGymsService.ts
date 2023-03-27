import { IGymsRepository } from '@/repositories/prisma/interfaces/IGymsRepository';
import { Gym } from '@prisma/client';

interface ISearchGymsServiceResquest {
  query: string;
  page: number;
}

interface ISearchGymsServiceResponse {
  gyms: Gym[];
}

export class SearchGymsService {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymsServiceResquest): Promise<ISearchGymsServiceResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
