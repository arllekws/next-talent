import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SavedProgramsService } from './saved-programs.service';
import { SavedProgramsController } from './saved-programs.controller';
import { SavedProgram } from './entities/saved-program.entity';
import { Program } from '../programs/entities/program.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([SavedProgram, Program]), UsersModule],
  controllers: [SavedProgramsController],
  providers: [SavedProgramsService],
  exports: [SavedProgramsService],
})
export class SavedProgramsModule {}
