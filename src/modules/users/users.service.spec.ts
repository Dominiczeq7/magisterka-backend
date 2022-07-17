import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { createConnections, getConnection } from 'typeorm';
import UsersUsers from '../../entities/users/users.users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const user1 = {
    id: 1,
    name: 'Test name',
    surname: 'Test surname',
    email: 'test@mail.com',
    password: 'test',
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
  };

  const user2 = {
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
  };

  const mockUsersRepository = {
    getUser: jest.fn().mockImplementation((id) => {
      user1.id = id;
      return user1;
    }),
    getUsers: jest.fn().mockImplementation(() => [user1, user2]),
    addUser: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: 5, ...user })),
  };

  // beforeAll(async () => {
  //   await createConnections();
  // });

  // afterAll(async () => {
  //   const defaultConnection = getConnection('default');
  //   await defaultConnection.close();
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getCustomRepositoryToken(UsersUsers),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = await module.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should add users', async () => {
      // expect(await service.addUser(user1 as UsersUsers)).toEqual({
      //   id: expect.any(Number),
      //   ...user1,
      // });
    });
  });
});
