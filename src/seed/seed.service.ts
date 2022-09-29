import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interfaces';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executedSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=750',
    );
    const pokemonToInsert: { name: string; no: number }[] = [];
    data.results.forEach(async ({ url, name }) => {
      const segment = url.split('/');
      const no: number = +segment[segment.length - 2];
      pokemonToInsert.push({ no, name });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return data.results;
  }
}
