import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interfaces';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  private readonly axios: AxiosInstance = axios;
  async executedSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=500',
    );
    data.results.forEach(async ({ url, name }) => {
      const segment = url.split('/');
      const no: number = +segment[segment.length - 2];
      await this.pokemonModel.create({ no, name });
    });

    return data.results;
  }
}
