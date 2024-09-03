import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Creature } from './schemas/types';
import { CreateCreatureDto } from './dtos/createCreature.dto';
import { CreatureService } from './creature.service';
import axios from 'axios';

@Controller('creatures')
export class CreatureController {
  constructor(private creatureService: CreatureService) {}

  @Get()
  async findAll(): Promise<{ count: number; result: Creature[] }> {
    return this.creatureService.findAll();
  }

  @Post()
  async create(
    @Body() createCreatureDto: CreateCreatureDto,
  ): Promise<Creature> {
    return this.creatureService.create(createCreatureDto);
  }

  @Get(':index')
  async findOne(@Param('index') index: string): Promise<Creature> {
    return this.creatureService.findOne(index);
  }

  @Get('populate')
  async populate() {
    const index = await axios.get('https://www.dnd5eapi.co/api/monsters/');
    const urls = index.data.results.map((monster) => monster.url);
    for (const url of urls) {
      const monster = await axios.get(`https://www.dnd5eapi.co${url}`);
      await this.creatureService.create(monster.data);
    }
  }
}
