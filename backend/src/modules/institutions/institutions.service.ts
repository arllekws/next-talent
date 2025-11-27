import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Institution } from './entities/institution.entity';
import { Program } from '../programs/entities/program.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectModel(Institution)
    private institutionModel: typeof Institution,
  ) {}

  async create(
    createInstitutionDto: CreateInstitutionDto,
  ): Promise<Institution> {
    try {
      const institution = await this.institutionModel.create({
        ...createInstitutionDto,
      } as any);
      return institution;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Instituição com este nome já existe');
      }
      throw new BadRequestException('Erro ao criar instituição');
    }
  }

  async findAll(): Promise<Institution[]> {
    return this.institutionModel.findAll({
      order: [['name', 'ASC']],
    });
  }

  async findOne(id: string): Promise<Institution> {
    const institution = await this.institutionModel.findByPk(id);

    if (!institution) {
      throw new NotFoundException(`Instituição com ID ${id} não encontrada`);
    }

    return institution;
  }

  async findProgramsByInstitution(id: string): Promise<Program[]> {
    const institution = await this.institutionModel.findByPk(id, {
      include: [
        {
          model: Program,
          as: 'programs',
        },
      ],
    });

    if (!institution) {
      throw new NotFoundException(`Instituição com ID ${id} não encontrada`);
    }

    return institution.programs;
  }

  async update(
    id: string,
    updateInstitutionDto: UpdateInstitutionDto,
  ): Promise<Institution> {
    const institution = await this.findOne(id);

    try {
      await institution.update(updateInstitutionDto);
      return institution;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Instituição com este nome já existe');
      }
      throw new BadRequestException('Erro ao atualizar instituição');
    }
  }

  async remove(id: string): Promise<void> {
    const institution = await this.findOne(id);
    await institution.destroy();
  }
}
