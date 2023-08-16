import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty({ example: 'Joe Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joe.doe@sample.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Joe569' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'my-pass-456' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResponseCreateUserDTO {
  created: boolean;
}
