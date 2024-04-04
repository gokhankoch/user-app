import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpInputDto } from '../users/dtos/signUp-input.dto';
import { SignUpOutputDto } from '../users/dtos/signUp-output.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(
      AuthService,
    ) as jest.Mocked<AuthService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signup with SignUpInputDto and return the result', async () => {
      const input: SignUpInputDto = { username: 'user', password: 'pass' };
      const output: SignUpOutputDto = { id: 1, username: 'user' };

      authService.signup.mockResolvedValue(output);

      expect(await controller.signup(input)).toEqual(output);
      expect(authService.signup).toHaveBeenCalledWith(input);
    });
  });

  describe('signin', () => {
    it('should call authService.signIn with the request body and return the result', async () => {
      const input: SignUpInputDto = { username: 'user', password: 'pass' };
      const signInResult = { userId: 1, access_token: 'token' };

      authService.signIn.mockResolvedValue(signInResult);

      expect(await controller.signin(input)).toEqual(signInResult);
      expect(authService.signIn).toHaveBeenCalledWith(input);
    });
  });
});
