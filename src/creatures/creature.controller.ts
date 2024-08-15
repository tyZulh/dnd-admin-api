import { Body, Controller, Get, Post } from '@nestjs/common';
import { Creature } from './schemas/creature.schema';
import { CreateCreatureDto } from './dtos/createCreature.dto';
import { CreatureService } from './creature.service';

@Controller('creatures')
export class CreatureController {
  constructor(private creatureService: CreatureService) {}

  @Get()
  async findAll(): Promise<Creature[]> {
    return this.creatureService.findAll();
  }

  @Post()
  async create(
    @Body() createCreatureDto: CreateCreatureDto,
  ): Promise<Creature> {
    return this.creatureService.create(createCreatureDto);
  }
}
