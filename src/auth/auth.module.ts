import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../common/database/database.module';
import { RedisModule } from '../common/redis/redis.module';
import { DriveModule } from '../common/drive/drive.module';

@Module({
  imports: [DatabaseModule, RedisModule, DriveModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
