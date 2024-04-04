import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpInputDto } from '../users/dtos/signUp-input.dto';
import { SignUpOutputDto } from '../users/dtos/signUp-output.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException({
        message: ' Invalid username',
      });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException({
        message: 'Invalid password',
      });
    }

    return { id: user.id, username: user.username };
  }

  async signIn(signUpInputDto: SignUpInputDto) {
    const user = await this.validateUser(
      signUpInputDto.username,
      signUpInputDto.password,
    );
    const payload = { username: user.username, sub: user.id };

    return {
      userId: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signUpInputDto: SignUpInputDto): Promise<SignUpOutputDto> {
    const hashedPassword = await bcrypt.hash(signUpInputDto.password, 10);
    const createdUser = await this.usersService.create({
      ...signUpInputDto,
      password: hashedPassword,
    });

    return { id: createdUser.id, username: createdUser.username };
  }
}
