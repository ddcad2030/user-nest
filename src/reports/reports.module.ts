import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { DatabaseModule } from 'src/database/database.module';
import { reportProviders } from './report.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportsController],
  providers: [...reportProviders, ReportsService],
})
export class ReportsModule {}
