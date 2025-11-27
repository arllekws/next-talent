import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateInstitutionDto {
  @ApiProperty({
    description: 'Nome da instituição',
    example: 'TechAcademy',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'URL do logo da instituição',
    example: 'https://example.com/logo.png',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: 'Descrição da instituição',
    example: 'Academia de tecnologia focada em formação de desenvolvedores.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Website da instituição',
    example: 'https://www.techacademy.com.br',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  website?: string;
}
