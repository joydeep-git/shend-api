import { DatabaseService } from '../../common/database/database.service';
import { Injectable } from '@nestjs/common';
import { CreateAnonymousUserType, CreateAuthUserType, UserDataType } from '../interfaces/user.interface';



@Injectable()
export class AuthRepository {

  constructor(private readonly db: DatabaseService) {}

  public async searchUser(value: string): Promise<UserDataType | null> {

    const query = `
      SELECT * FROM users
      WHERE email = $1 OR id = $1
      LIMIT 1
    `;

    const data = await this.db.query<UserDataType>(query, [value]);

    return data.rows[0] ?? null;

  }



  public async createAuthUser(data: CreateAuthUserType): Promise<UserDataType> {

    const query = `
      INSERT INTO users ( email, name, avatar_url, is_anonymous, is_premium, ip_address, user_agent, browser, operating_system, device_type, language, timezone )
      VALUES (
        $1, $2, $3, FALSE, FALSE,
        $4, $5, $6, $7, $8, $9, $10
      )
      RETURNING *
    `;

    const result = await this.db.query<UserDataType>(query, [
      data.email,
      data.name,
      data.avatar_url,
      data.ip_address,
      data.user_agent,
      data.browser,
      data.operating_system,
      data.device_type,
      data.language,
      data.timezone,
    ]);

    return result.rows[0];

  }


  public async createAnonymousUser( data: CreateAnonymousUserType ): Promise<UserDataType> {

    const query = `
      INSERT INTO users (is_anonymous, is_premium, ip_address, user_agent, browser, operating_system, device_type, language, timezone )
      VALUES (
        TRUE,
        FALSE,
        $1, $2, $3, $4, $5, $6, $7
      )
      RETURNING *
    `;

    const result = await this.db.query<UserDataType>(query, [
      data.ip_address,
      data.user_agent,
      data.browser,
      data.operating_system,
      data.device_type,
      data.language,
      data.timezone,
    ]);

    return result.rows[0];

  }

}
