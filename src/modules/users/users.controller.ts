import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserLogin } from 'src/interfaces/users';
import UsersUsers from '../../entities/users/users.users.entity';
import UsersStudents from '../../entities/users/users.students.entity';
import UsersTeachers from '../../entities/users/users.teachers.entity';
import UsersPermissions from '../../entities/users/users.permissions.entity';
import UsersStatuses from '../../entities/users/users.statuses.entity';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  //------------------------
  //users
  //-----------------------
  @Get('/users')
  async getUsers(): Promise<UsersUsers[]> {
    return await this.usersService.getUsers();
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: number): Promise<UsersUsers> {
    return await this.usersService.getUser(id);
  }

  @Post('/users')
  async addUser(@Body() user: UsersUsers): Promise<UsersUsers> {
    return await this.usersService.addUser(user);
  }

  @Patch('/users/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() fields: Partial<UsersUsers>,
  ): Promise<UsersUsers> {
    return await this.usersService.updateUser(id, fields);
  }

  @Delete('/users/:id')
  async removeUser(@Param('id') id: number): Promise<boolean> {
    return await this.usersService.removeUser(id);
  }

  @Post('/login')
  async loginUser(@Body() user: UserLogin): Promise<number> {
    return await this.usersService.loginUser(user);
  }
  //------------------------------
  //students
  //--------------------------------
  @Get('/students')
  async getStudents(): Promise<UsersStudents[]> {
    return await this.usersService.getStudents();
  }

  @Get('/students/:id')
  async getStudent(@Param('id') id: number): Promise<UsersStudents> {
    return await this.usersService.getStudent(id);
  }

  @Post('/students')
  async addStudent(@Body() item: UsersStudents): Promise<UsersStudents> {
    return await this.usersService.addStudent(item);
  }

  @Patch('/students/:id')
  async updateStudent(
    @Param('id') id: number,
    @Body() fields: Partial<UsersStudents>,
  ): Promise<UsersStudents> {
    return await this.usersService.updateStudent(id, fields);
  }

  @Delete('/students/:id')
  async removeStudent(@Param('id') id: number): Promise<boolean> {
    return await this.usersService.removeStudent(id);
  }
  //---------------------------
  //teachers
  //----------------------------
  @Get('/teachers')
  async getTeachers(): Promise<UsersTeachers[]> {
    return await this.usersService.getTeachers();
  }

  @Get('/teachers/:id')
  async getTeacher(@Param('id') id: number): Promise<UsersTeachers> {
    return await this.usersService.getTeacher(id);
  }

  @Post('/teachers')
  async addTeacher(@Body() item: UsersTeachers): Promise<UsersTeachers> {
    return await this.usersService.addTeacher(item);
  }

  @Patch('/teachers/:id')
  async updateTeacher(
    @Param('id') id: number,
    @Body() fields: Partial<UsersTeachers>,
  ): Promise<UsersTeachers> {
    return await this.usersService.updateTeacher(id, fields);
  }

  @Delete('/teachers/:id')
  async removeTeacher(@Param('id') id: number): Promise<boolean> {
    return await this.usersService.removeTeacher(id);
  }

  //-------------------------
  //permissions
  //-------------------------
  @Get('/permissions')
  async getUsersPermissions(): Promise<UsersPermissions[]> {
    return await this.usersService.getUsersPermissions();
  }

  //-------------------------
  //statuses
  //-------------------------
  @Get('/statuses')
  async getUsersStatuses(): Promise<UsersStatuses[]> {
    return await this.usersService.getUsersStatuses();
  }
}
