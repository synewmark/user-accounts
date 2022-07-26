import { BadRequestException, Body, ConflictException, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from 'src/users.entity';


@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getUser/:name')
  async getUser(@Param('name') name): Promise<Users> {
    let result: Promise<Users> = this.appService.getUser(name);
    // not sure best way to throw excception here - look into interceptors?
    if (!await result) {
      throw new NotFoundException("User with given name not found");
    }
    return result;
  }

  @Post('addUser')
  async addUser(@Body() user : Users) : Promise<string> {
    return this.appService.addUser(user);
  }
}