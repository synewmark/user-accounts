import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/users.entity';
import { UserRepo } from "src/app.module"
import Redis  from "ioredis";

var redis = new Redis();
@Injectable()
export class AppService {
  async getUser(name: string) : Promise<Users> {
    let userString : string = await redis.get(name);
    let user : Users;
    if (!userString) {
      // console.log("Cache miss");
      user = await UserRepo.findOneBy({name: name});
      // Don't cache the value if the user doesn't even exist in the Database
      if(user) {
        await redis.set(name, JSON.stringify(user));
        // console.log("Caching value");
      }
    } else {
      // console.log("Cache hit");
      user = JSON.parse(userString);
    }
    return user;
  }
  async addUser(user : Users) : Promise<string>{
    // don't allow duplicate users with same name
    if (await this.getUser(user.name)) {
      throw new ConflictException('User with that name already exists');
    }
    UserRepo.save(user);
    return "Created User succesfully";
  }
}
