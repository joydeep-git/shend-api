import { Provider } from '@nestjs/common';
import { google } from 'googleapis';

export const GOOGLE_DRIVE = 'GOOGLE_DRIVE';

export const DriveProvider: Provider = {
  provide: GOOGLE_DRIVE,

  useFactory: () => {
    const auth = new google.auth.OAuth2(
      process.env.GA_CLIENT,
      process.env.GA_SECRET,
    );

    auth.setCredentials({
      refresh_token: process.env.GA_REFRESH_TOKEN,
    });

    return google.drive({
      version: 'v3',
      auth,
    });
  },
};
