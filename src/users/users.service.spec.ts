import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { DATASOURCE } from '../dynamicDbSwitcher/dynamic-db-switcher.utils';
import { SignUpInputDto } from './dtos/signUp-input.dto';
import { User } from './entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let dataSourceMock: Partial<DataSource>;
  let usersRepositoryMock: any;
  let userDetailsRepositoryMock: any;
  let roleRepositoryMock: any;

  beforeEach(async () => {
    // Create mock repositories
    usersRepositoryMock = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      // Add other necessary methods that your service uses
    };

    userDetailsRepositoryMock = {
      save: jest.fn(),
      // Add other necessary methods
    };

    roleRepositoryMock = {
      findOne: jest.fn(),
      save: jest.fn(),
      // Add other necessary methods
    };

    // Mock the DataSource and its getRepository method
    dataSourceMock = {
      getRepository: jest.fn().mockImplementation((entity) => {
        if (entity.name === 'User') {
          return usersRepositoryMock;
        } else if (entity.name === 'UserDetails') {
          return userDetailsRepositoryMock;
        } else if (entity.name === 'Role') {
          return roleRepositoryMock;
        }
      }),
      // Mock other DataSource methods as necessary
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DATASOURCE,
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Example test for create method
  describe('create', () => {
    it('should successfully create a user', async () => {
      const signUpInput: SignUpInputDto = {
        username: 'testuser',
        password: 'testpass',
      };

      usersRepositoryMock.findOneBy = jest.fn().mockResolvedValue(null);
      usersRepositoryMock.save = jest.fn().mockResolvedValue({
        id: 1,
        username: signUpInput.username,
      });

      const result = await service.create(signUpInput);

      expect(usersRepositoryMock.findOneBy).toHaveBeenCalledWith({
        username: signUpInput.username,
      });
      expect(usersRepositoryMock.save).toHaveBeenCalledWith(expect.any(User));
      expect(result).toEqual({ username: signUpInput.username, id: 1 });
    });

    it('should throw BadRequestException if user exists', async () => {
      const signUpInput: SignUpInputDto = {
        username: 'testuser',
        password: 'testpass',
      };

      usersRepositoryMock.findOneBy = jest
        .fn()
        .mockResolvedValue({ id: 1, username: signUpInput.username });

      await expect(service.create(signUpInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateMe', () => {
    it('should update user details successfully', async () => {
      const userId = 1;
      const userUpdate = {
        firstName: 'NewFirstName',
        lastName: 'NewLastName',
        roleId: 1,
      };

      usersRepositoryMock.findOne = jest.fn().mockResolvedValue({
        id: userId,
        roles: [],
        userDetails: {},
        save: jest.fn(),
      });

      userDetailsRepositoryMock.save = jest
        .fn()
        .mockImplementation((details) => details);
      roleRepositoryMock.findOne = jest
        .fn()
        .mockResolvedValue({ id: 1, users: [] });

      const result = await service.updateMe(userId, userUpdate);

      expect(usersRepositoryMock.findOne).toHaveBeenCalled();
      expect(userDetailsRepositoryMock.save).toHaveBeenCalledWith({
        firstName: 'NewFirstName',
        lastName: 'NewLastName',
      });
      expect(roleRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: userUpdate.roleId },
        relations: ['users'],
      });
      expect(result).toEqual({
        userId,
        roles: [
          {
            id: 1,
            users: [],
          },
        ],
        userUpdate,
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 1;
      const userUpdate = {
        firstName: 'NewFirstName',
        lastName: 'NewLastName',
        roleId: 1,
      };

      usersRepositoryMock.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.updateMe(userId, userUpdate)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getMe', () => {
    it('should return user details successfully', async () => {
      const userId = 1;
      const userDetails = {
        id: userId,
        username: 'testuser',
        roles: [],
        userDetails: { firstName: 'Test', lastName: 'User' },
      };

      usersRepositoryMock.findOne = jest.fn().mockResolvedValue(userDetails);

      const result = await service.getMe(userId);

      expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: userId },
        relations: ['userDetails', 'roles'],
      });
      expect(result).toEqual(userDetails);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 1;

      usersRepositoryMock.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.getMe(userId)).rejects.toThrow(NotFoundException);
    });
  });
});
