import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class Mail {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  message: string;
}
