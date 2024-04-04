import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const token: string = request.cookies['jwt'];
      if (!token) throw new UnauthorizedException();

      console.log(request.cookies['jwt']);
      const payload = await this.jwtService.verifyAsync(
        request.cookies['jwt'],
        { secret: process.env.JWT_SECRET },
      );

      request.user = payload;

      return true;
    } catch (err: unknown) {
      throw new UnauthorizedException();
    }
  }
}
