import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCreatureDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
