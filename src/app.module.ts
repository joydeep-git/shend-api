import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './common/redis/redis.module';
import { DriveModule } from './common/drive/drive.module';

@Module({

  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true }),
    AuthModule,
    RedisModule,
    DriveModule,
  ],

  controllers: [],

  providers: [],

})

export class AppModule {}
