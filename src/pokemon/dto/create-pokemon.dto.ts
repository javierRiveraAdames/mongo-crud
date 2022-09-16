import { IsString, IsInt, IsPositive, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  no: number;

  @IsString()
  @MinLength(5)
  name: string;
}
