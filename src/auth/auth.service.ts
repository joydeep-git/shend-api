import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database/database.service';

@Injectable()
export class AuthService {

  constructor(private readonly db: DatabaseService) { }


  private async validateToken( token: string ) : Promise<boolean> {

    // const

    return false;
  }


  public async authenticate(  ): Promise<void> {



  }
  

}
