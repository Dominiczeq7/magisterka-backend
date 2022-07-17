import { Test, TestingModule } from '@nestjs/testing';
import UsersUsers from '../../entities/users/users.users.entity';
import { updateFromPartial } from '../../utils/conversion';
import { findInObjArray } from '../../utils/exploring';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const users = [
    {
      id: 1,
      name: 'Test name',
      surname: 'Test surname',
      email: 'test@mail.com',
      permission: {
        id: 2,
        name: 'podstawowe',
      },
      status: {
        id: 1,
        name: 'aktywny',
      },
      teacher: {
        id: 1,
        title: 'prof.',
        position: '',
      },
    },
    {
      id: 2,
      name: 'Test name2',
      surname: 'Test surname2',
      email: 'test2@mail.com',
      permission: {
        id: 2,
        name: 'podstawowe',
      },
      status: {
        id: 1,
        name: 'aktywny',
      },
      teacher: {
        id: 1,
        title: 'dr',
        position: '',
      },
    },
  ];

  const mockUsersService = {
    getUser: jest.fn((id) => {
      return findInObjArray(users, id, 'id');
    }),
    getUsers: jest.fn(() => {
      return users;
    }),
    addUser: jest.fn((user) => {
      return { id: 5, ...user };
    }),
    updateUser: jest.fn((id, fields) => {
      const user = findInObjArray(users, id, 'id');
      const updatedUser = updateFromPartial(user, fields);
      return updatedUser;
    }),
    removeUser: jest.fn((id) => {
      return findInObjArray(users, id, 'id') ? true : false;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should get user', async () => {
      const id = 1;
      expect(await controller.getUser(id)).toEqual({
        id: id,
        name: expect.any(String),
        surname: expect.any(String),
        email: expect.any(String),
        permission: expect.any(Object),
        status: expect.any(Object),
        teacher: expect.any(Object),
      });
    });
  });

  describe('getUsers', () => {
    it('should get users', async () => {
      expect(await controller.getUsers()).not.toHaveLength(0);
    });
  });

  describe('addUser', () => {
    it('should add users', async () => {
      expect(await controller.addUser(users[0] as UsersUsers)).toEqual({
        id: expect.any(Number),
        ...users[0],
      });
    });
  });

  describe('updateUser', () => {
    const id = 1;
    const name = 'John';

    const user = findInObjArray(users, id, 'id');

    it('should update user', async () => {
      expect(await controller.updateUser(1, { name: name })).toEqual({
        id: user.id,
        name: name,
        surname: user.surname,
        email: user.email,
        permission: user.permission,
        status: user.status,
        teacher: user.teacher,
      });
    });
  });

  describe('removeUser', () => {
    const id = 1;

    it('should remove user', async () => {
      expect(await controller.removeUser(id)).toBe(true);
    });
  });
});
