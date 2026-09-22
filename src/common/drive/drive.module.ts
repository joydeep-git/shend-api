import { Module } from '@nestjs/common';
import { DriveService } from './drive.service';
import { DriveProvider } from './drive.provider';

@Module({
  providers: [DriveService, DriveProvider],
  exports: [DriveService]
})
export class DriveModule {}
