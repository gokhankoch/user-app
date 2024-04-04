import {
  Controller,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpOutputDto } from '../users/dtos/signUp-output.dto';
import { SignUpInputDto } from '../users/dtos/signUp-input.dto';

@Controller('/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body(ValidationPipe) signUpInputDto: SignUpInputDto,
  ): Promise<SignUpOutputDto> {
    return this.authService.signup(signUpInputDto);
  }

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() signUpInputDto: SignUpInputDto) {
    return this.authService.signIn(signUpInputDto);
  }
}
