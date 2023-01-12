import { Controller, Get, Post, Redirect, Render, Session } from '@nestjs/common';
import session from 'express-session';
import { AppService } from './app.service';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index(@Session() session: Record<string, any>) {
    let userName = '';
    if (session.user_id) {
      // ...
    } else {
      userName = 'Guest';
    }

    return { message: `Welcome to the homepage, ${userName}` };
  }

  @Get('/register')
  @Render('register')
  registerForm() {
    return {};
  }

@Post('/register')
@Redirect()
register() {

}

}
