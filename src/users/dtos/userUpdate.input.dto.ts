import { IsString, IsNumber } from 'class-validator';

export class UserUpdate {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsNumber()
  roleId: number;
}
