import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(
      UsersService,
    ) as jest.Mocked<UsersService>;
    jwtService = module.get<JwtService>(JwtService) as jest.Mocked<JwtService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate a user successfully', async () => {
      const user = {
        id: 1,
        username: 'test',
        password: await bcrypt.hash('123456', 10),
      };
      usersService.findOne.mockResolvedValue(user);

      const result = await service.validateUser('test', '123456');
      expect(result).toEqual({ id: user.id, username: user.username });
    });

    it('should throw an error if user is not found', async () => {
      usersService.findOne.mockResolvedValue(null);
      await expect(service.validateUser('test', '123456')).rejects.toThrow();
    });

    it('should throw an error if password is incorrect', async () => {
      const user = {
        id: 1,
        username: 'test',
        password: await bcrypt.hash('123456', 10),
      };
      usersService.findOne.mockResolvedValue(user);

      await expect(
        service.validateUser('test', 'wrongpassword'),
      ).rejects.toThrow();
    });
  });

  describe('signIn', () => {
    it('should return a token for valid credentials', async () => {
      const user = {
        id: 1,
        username: 'test',
        password: await bcrypt.hash('123456', 10),
      };
      const payload = { username: user.username, sub: user.id };
      usersService.findOne.mockResolvedValue(user);
      jwtService.sign.mockReturnValue('token');

      const result = await service.signIn({
        username: 'test',
        password: '123456',
      });
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({ userId: user.id, access_token: 'token' });
    });
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const signUpInputDto = { username: 'newuser', password: 'newpass' };
      const createdUser = {
        id: 2,
        username: 'newuser',
        password: await bcrypt.hash('newpass', 10),
      };

      usersService.create.mockResolvedValue(createdUser);

      const result = await service.signup(signUpInputDto);
      expect(result).toEqual({
        id: createdUser.id,
        username: createdUser.username,
      });
    });
  });
});
