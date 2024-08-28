import { Module } from '@nestjs/common';
import { dataProviders } from './database.provider';

@Module({
    providers:[... dataProviders],
    exports:[... dataProviders],
})
export class DatabaseModule {}
