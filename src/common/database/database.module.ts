import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './database.provider';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseProvider, DatabaseService],
  exports: [DatabaseService],
})

export class DatabaseModule {}
