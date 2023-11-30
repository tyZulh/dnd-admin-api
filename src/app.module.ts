import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesModule } from './creatures/creatures.module';
import { CreaturesController } from './src/creatures/creatures/creatures.controller';
import { CreaturesModule } from './creatures/creatures.module';

@Module({
  imports: [CreaturesModule],
  controllers: [AppController, CreaturesController],
  providers: [AppService],
})
export class AppModule {}
