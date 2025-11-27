import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ProgramStatus, ProgramLevel } from '../entities/program.entity';

export class FilterProgramDto {
  @ApiProperty({
    description: 'Filtrar por área',
    example: 'Full Stack',
    required: false,
  })
  @IsString()
  @IsOptional()
  area?: string;

  @ApiProperty({
    description: 'Filtrar por tipo',
    example: 'Bootcamp',
    required: false,
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    description: 'Filtrar por nível',
    enum: ProgramLevel,
    example: ProgramLevel.PLENO,
    required: false,
  })
  @IsEnum(ProgramLevel)
  @IsOptional()
  level?: ProgramLevel;

  @ApiProperty({
    description: 'Filtrar por status',
    enum: ProgramStatus,
    example: ProgramStatus.OPEN,
    required: false,
  })
  @IsEnum(ProgramStatus)
  @IsOptional()
  status?: ProgramStatus;

  @ApiProperty({
    description: 'Filtrar por tags (separadas por vírgula)',
    example: 'frontend,backend',
    required: false,
  })
  @IsString()
  @IsOptional()
  tags?: string;

  @ApiProperty({
    description: 'Filtrar por deadline (formato ISO)',
    example: '2025-12-31',
    required: false,
  })
  @IsString()
  @IsOptional()
  deadline?: string;

  @ApiProperty({
    description: 'Número da página',
    example: 1,
    required: false,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: 'Quantidade de itens por página',
    example: 10,
    required: false,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
