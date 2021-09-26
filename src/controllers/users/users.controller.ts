import { UsersService } from '@/services/users/users.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getList() {
    const userList = await this.usersService.getAllUserList();
    return { userList };
  }
}
