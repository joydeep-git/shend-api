import { Controller, Post, Logger, Get, Delete, } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from "express";
import { Req } from "@nestjs/common";


@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
  ) {}


  // signup route for auth and anonymous users
  @Post("google")
  public async authenticateUser( @Req() req: Request): Promise<any> {



  }


  @Get("refresh")
  public async refreshToken( @Req() req: Request ) {

  }


  @Delete()
  public async deleteAccount( @Req() req: Request ) {



  }


}
