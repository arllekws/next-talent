import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ description: 'ID do programa' })
  @IsUUID()
  @IsNotEmpty()
  programId: string;
}
