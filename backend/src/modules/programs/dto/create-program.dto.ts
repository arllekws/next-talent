import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsEnum,
  IsArray,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';
import { ProgramStatus, ProgramLevel } from '../entities/program.entity';

export class CreateProgramDto {
  @ApiProperty({
    description: 'ID da instituição que oferece o programa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  institutionId: string;

  @ApiProperty({
    description: 'Título do programa',
    example: 'Bootcamp Full Stack',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Tipo do programa',
    example: 'Bootcamp',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Data limite para inscrição (formato ISO)',
    example: '2025-12-31',
  })
  @IsDateString()
  @IsNotEmpty()
  deadline: string;

  @ApiProperty({
    description: 'Descrição detalhada do programa',
    example: 'Formação intensiva para desenvolver aplicações completas.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Número de participantes',
    example: 100,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  participants?: number;

  @ApiProperty({
    description: 'Status do programa',
    enum: ProgramStatus,
    example: ProgramStatus.OPEN,
    required: false,
  })
  @IsEnum(ProgramStatus)
  @IsOptional()
  status?: ProgramStatus;

  @ApiProperty({
    description: 'Tags do programa',
    example: ['frontend', 'backend'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Área do programa',
    example: 'Full Stack',
    required: false,
  })
  @IsString()
  @IsOptional()
  area?: string;

  @ApiProperty({
    description: 'Nível do programa',
    enum: ProgramLevel,
    example: ProgramLevel.PLENO,
    required: false,
  })
  @IsEnum(ProgramLevel)
  @IsOptional()
  level?: ProgramLevel;
}
