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

  async findAll(): Promise<{ count: number; result: ICreature[] }> {
    const count = await this.creatureModel.count().exec();
    const result = await this.creatureModel
      .find()
      .select({ name: 1, index: 1 })
      .exec();
    return { count, result };
  }

  async findOne(index: string): Promise<ICreature> {
    return this.creatureModel.findOne({ index: index }).exec();
  }
}
