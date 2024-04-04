import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpInputDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
