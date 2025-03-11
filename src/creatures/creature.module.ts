import { Module } from '@nestjs/common';
import Creature from './schemas/creature.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatureService } from './creature.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Creature', schema: Creature }]),
  ],
  controllers: [],
  providers: [CreatureService],
})
export class CreatureModule {}
