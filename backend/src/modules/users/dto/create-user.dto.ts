import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firebaseUid: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  photoURL?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  interests?: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  preferences?: string[];
}
