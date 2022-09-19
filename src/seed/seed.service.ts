import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interfaces';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  async executedSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1',
    );
    data.results.forEach(({ url, name }) => {
      const segment = url.split('/');
      console.log(segment);
    });
    return data.results;
  }
}
