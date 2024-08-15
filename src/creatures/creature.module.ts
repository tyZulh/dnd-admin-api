import { Module } from '@nestjs/common';
import { CreatureSchema } from './schemas/creature.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatureService } from './creature.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Creature', schema: CreatureSchema }]),
  ],
  controllers: [],
  providers: [CreatureService],
})
export class CreatureModule {}
