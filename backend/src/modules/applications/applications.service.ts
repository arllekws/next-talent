import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Application } from './entities/application.entity';
import { Program } from '../programs/entities/program.entity';
import { Institution } from '../institutions/entities/institution.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(@InjectModel(Application) private applicationModel: typeof Application) {}

  async create(userId: string, createApplicationDto: CreateApplicationDto): Promise<Application> {
    try {
      return await this.applicationModel.create({
        userId,
        programId: createApplicationDto.programId,
      } as any);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Você já se inscreveu neste programa');
      }
      throw error;
    }
  }

  async findByUser(userId: string): Promise<Application[]> {
    return this.applicationModel.findAll({
      where: { userId },
      include: [
        {
          model: Program,
          as: 'program',
          include: [{ model: Institution, as: 'institution' }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Application> {
    const application = await this.applicationModel.findByPk(id, {
      include: [
        {
          model: Program,
          as: 'program',
          include: [{ model: Institution, as: 'institution' }],
        },
      ],
    });
    if (!application) {
      throw new NotFoundException(`Inscrição com ID ${id} não encontrada`);
    }
    return application;
  }
}
