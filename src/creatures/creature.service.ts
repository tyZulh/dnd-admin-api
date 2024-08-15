import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCreatureDto } from './dtos/createCreature.dto';
import { ICreature } from './interfaces/creature.interface';

@Injectable()
export class CreatureService {
  constructor(
    @InjectModel('Creature') private creatureModel: Model<ICreature>,
  ) {}

  async create(createCreatureDto: CreateCreatureDto): Promise<ICreature> {
    const createdCreature = new this.creatureModel(createCreatureDto);
    return createdCreature.save();
  }

  async findAll(): Promise<ICreature[]> {
    return this.creatureModel.find().exec();
  }
}
