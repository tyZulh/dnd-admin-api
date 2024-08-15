import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatureController } from './creatures/creature.controller';
import { CreatureService } from './creatures/creature.service';
import { CreatureSchema } from './creatures/schemas/creature.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:password@localhost:27017/', {
      dbName: 'dnd-admin-back',
    }),
    MongooseModule.forFeature([{ name: 'Creature', schema: CreatureSchema }]),
  ],
  controllers: [AppController, CreatureController],
  providers: [AppService, CreatureService],
})
export class AppModule {}
