import { Injectable } from '@nestjs/common';
import UsersPermissions from '../../entities/users/users.permissions.entity';
import UsersStatuses from '../../entities/users/users.statuses.entity';
import UsersStudents from '../../entities/users/users.students.entity';
import UsersTeachers from '../../entities/users/users.teachers.entity';
import UsersUsers from '../../entities/users/users.users.entity';
import { updateFromPartial } from '../../utils/conversion';
@Injectable()
export class UsersService {
  //-------------------------
  //users
  //-----------------------------
  async getUsers(): Promise<UsersUsers[]> {
    let users = await UsersUsers.find({
      relations: ['permission', 'status', 'student', 'teacher'],
    });
    users.map((user) => {
      user.student = user.student[0];
      user.teacher = user.teacher[0];
    });
    return users;
  }

  async getUser(id: number): Promise<UsersUsers> {
    let user = await UsersUsers.findOne(id, {
      relations: ['permission', 'status', 'student', 'teacher'],
    });
    user.student = user.student[0];
    user.teacher = user.teacher[0];
    return user;
  }

  async addUser(user: UsersUsers): Promise<UsersUsers> {
    const id = (await UsersUsers.save(user)).id;
    const new_user = await this.getUser(id);
    return await new_user;
  }

  async updateUser(
    id: number,
    fields: Partial<UsersUsers>,
  ): Promise<UsersUsers> {
    const user = await UsersUsers.findOne(id);

    const user_to_update = updateFromPartial(user, fields);
    await UsersUsers.save(user_to_update);
    const updated_user = await this.getUser(id);
    return await updated_user;
  }

  async removeUser(id: number): Promise<boolean> {
    const is_removed = (await UsersUsers.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  async loginUser(user: any): Promise<number> {
    const foundStatus = await UsersStatuses.findOne({
      where: {
        name: 'aktywny',
      },
    });

    const foundUser = await UsersUsers.findOne({
      where: {
        status: foundStatus,
        ...user,
      },
    });
    const userId = foundUser ? foundUser.id : 0;
    return await userId;
  }
  //------------------
  // students
  //------------------
  async getStudents(): Promise<UsersStudents[]> {
    return await UsersStudents.find({
      relations: ['user', 'class'],
    });
  }
  async getStudent(id: number): Promise<UsersStudents> {
    let user = await UsersStudents.findOne(id, {
      relations: ['user', 'class'],
    });
    return user;
  }

  async addStudent(user: UsersStudents): Promise<UsersStudents> {
    const id = (await UsersStudents.save(user)).id;
    const new_user = await this.getStudent(id);
    return await new_user;
  }

  async updateStudent(
    id: number,
    fields: Partial<UsersStudents>,
  ): Promise<UsersStudents> {
    const user = await UsersStudents.findOne(id);

    const user_to_update = updateFromPartial(user, fields);
    await UsersStudents.save(user_to_update);
    const updated_user = await this.getStudent(id);
    return await updated_user;
  }

  async removeStudent(id: number): Promise<boolean> {
    const is_removed = (await UsersStudents.delete(id)).affected;
    return await (is_removed ? true : false);
  }
  //-------------------------
  //teachers
  //-------------------------
  async getTeachers(): Promise<UsersTeachers[]> {
    let users = await UsersTeachers.find({
      relations: ['user', 'structures'],
    });
    return users;
  }

  async getTeacher(id: number): Promise<UsersTeachers> {
    let user = await UsersTeachers.findOne(id, {
      relations: ['user', 'structures'],
    });
    return user;
  }

  async addTeacher(user: UsersTeachers): Promise<UsersTeachers> {
    const id = (await UsersTeachers.save(user)).id;
    const new_user = await this.getTeacher(id);
    return await new_user;
  }

  async updateTeacher(
    id: number,
    fields: Partial<UsersTeachers>,
  ): Promise<UsersTeachers> {
    const user = await UsersTeachers.findOne(id);

    const user_to_update = updateFromPartial(user, fields);
    await UsersTeachers.save(user_to_update);
    const updated_user = await this.getTeacher(id);
    return await updated_user;
  }

  async removeTeacher(id: number): Promise<boolean> {
    const is_removed = (await UsersTeachers.delete(id)).affected;
    return await (is_removed ? true : false);
  }

  //-------------------------
  //permissions
  //-------------------------
  async getUsersPermissions(): Promise<UsersPermissions[]> {
    let permissions = await UsersPermissions.find();
    return permissions;
  }

  //-------------------------
  //statuses
  //-------------------------
  async getUsersStatuses(): Promise<UsersStatuses[]> {
    let statuses = await UsersStatuses.find();
    return statuses;
  }
}
