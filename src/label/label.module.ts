import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { DatabaseModule } from 'src/database/database.module';
import { labelsProviders } from './labels.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LabelController],
  providers: [LabelService, ...labelsProviders]
})
export class LabelModule {}
