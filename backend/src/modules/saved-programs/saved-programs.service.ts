import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SavedProgram } from './entities/saved-program.entity';
import { Program } from '../programs/entities/program.entity';
import { Institution } from '../institutions/entities/institution.entity';

@Injectable()
export class SavedProgramsService {
  constructor(@InjectModel(SavedProgram) private savedProgramModel: typeof SavedProgram) {}

  async save(userId: string, programId: string): Promise<SavedProgram> {
    try {
      return await this.savedProgramModel.create({ userId, programId } as any);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Programa já está nos favoritos');
      }
      throw error;
    }
  }

  async findByUser(userId: string): Promise<Program[]> {
    const savedPrograms = await this.savedProgramModel.findAll({
      where: { userId },
      include: [
        {
          model: Program,
          as: 'program',
          include: [{ model: Institution, as: 'institution' }],
        },
      ],
    });
    return savedPrograms.map((sp) => sp.program);
  }

  async remove(userId: string, programId: string): Promise<void> {
    const savedProgram = await this.savedProgramModel.findOne({
      where: { userId, programId },
    });
    if (!savedProgram) {
      throw new NotFoundException('Programa não está nos favoritos');
    }
    await savedProgram.destroy();
  }
}
