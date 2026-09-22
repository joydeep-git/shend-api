import { Provider } from '@nestjs/common';
import { google } from 'googleapis';

export const GOOGLE_DRIVE = 'GOOGLE_DRIVE';

export const DriveProvider: Provider = {
  provide: GOOGLE_DRIVE,

  useFactory: () => {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GD_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    return google.drive({
      version: 'v3',
      auth,
    });
  },
};
