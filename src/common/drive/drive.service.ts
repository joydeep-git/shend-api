import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GOOGLE_DRIVE } from './drive.provider';
import { drive_v3 } from 'googleapis';

@Injectable()
export class DriveService {

  private readonly logger = new Logger(DriveService.name);

  constructor(
    @Inject(GOOGLE_DRIVE)
    private readonly drive: drive_v3.Drive,
  ) {}





}
