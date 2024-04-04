import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserUpdate } from './dtos/userUpdate.input.dto';

describe('UsersController', () => {
  let controller: UsersController;

  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    // Create a mock UsersService with Jest mock functions
    const mockUsersService = {
      getMe: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
      updateMe: jest.fn().mockResolvedValue({
        id: 1,
        firstName: 'Updated',
        lastName: 'User',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    usersService = module.get<UsersService>(
      UsersService,
    ) as jest.Mocked<UsersService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('should return user data', async () => {
      const req = { user: { userId: 1 } };
      const userData = {
        id: 1,
        username: 'testuser',
        roles: [],
        userDetails: { id: 1, firstName: 'testuser', lastName: 'testuser' },
      };

      usersService.getMe.mockResolvedValue(userData);

      const result = await controller.getMe(req);

      expect(result).toEqual(userData);
      expect(usersService.getMe).toHaveBeenCalledWith(req.user.userId);
    });
  });

  describe('updateMe', () => {
    it('should update user data', async () => {
      const req = { user: { userId: 1 } };
      const userUpdateData: UserUpdate = {
        firstName: 'Test',
        lastName: 'User',
        roleId: 1,
      };
      const updatedUserData = {
        userId: 1,
        userUpdate: userUpdateData,
        roles: [],
      };

      usersService.updateMe.mockResolvedValue(updatedUserData);

      const result = await controller.updateMe(req, userUpdateData);

      expect(result).toEqual(updatedUserData);
      expect(usersService.updateMe).toHaveBeenCalledWith(
        req.user.userId,
        userUpdateData,
      );
    });
  });
});
