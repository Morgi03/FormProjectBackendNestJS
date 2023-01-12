import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Session,
} from '@nestjs/common';
import session from 'express-session';
import { AppService } from './app.service';
import db from './db';
import * as bcrypt from 'bcrypt';
import UserDataDto from './userdata.dto';

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
  async register(@Body() userdata: UserDataDto) {
   await db.execute('INSERT INTO users (username, password) VALUES (?, ?)',
     [ userdata.username,
      await bcrypt.hash(userdata.password, 10)
     ],
    );
    return {
      url: '/',
    };
  }
}
