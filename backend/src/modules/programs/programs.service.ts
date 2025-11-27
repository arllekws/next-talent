import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Program } from './entities/program.entity';
import { Institution } from '../institutions/entities/institution.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FilterProgramDto } from './dto/filter-program.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(Program)
    private programModel: typeof Program,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    try {
      const program = await this.programModel.create({
        ...createProgramDto,
      } as any);
      return this.findOne(program.id);
    } catch (error) {
      throw new BadRequestException('Erro ao criar programa');
    }
  }

  async findAll(filters: FilterProgramDto) {
    const { page = 1, limit = 10, tags, ...otherFilters } = filters;
    const offset = (page - 1) * limit;

    const where: any = {};

    // Apply filters
    if (otherFilters.area) {
      where.area = { [Op.iLike]: `%${otherFilters.area}%` };
    }
    if (otherFilters.type) {
      where.type = { [Op.iLike]: `%${otherFilters.type}%` };
    }
    if (otherFilters.level) {
      where.level = otherFilters.level;
    }
    if (otherFilters.status) {
      where.status = otherFilters.status;
    }
    if (otherFilters.deadline) {
      where.deadline = { [Op.gte]: otherFilters.deadline };
    }
    if (tags) {
      const tagArray = tags.split(',').map((tag) => tag.trim());
      where.tags = { [Op.overlap]: tagArray };
    }

    const { rows, count } = await this.programModel.findAndCountAll({
      where,
      include: [
        {
          model: Institution,
          as: 'institution',
          attributes: ['id', 'name', 'logo'],
        },
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programModel.findByPk(id, {
      include: [
        {
          model: Institution,
          as: 'institution',
          attributes: ['id', 'name', 'logo', 'description', 'website'],
        },
      ],
    });

    if (!program) {
      throw new NotFoundException(`Programa com ID ${id} não encontrado`);
    }

    return program;
  }

  async update(
    id: string,
    updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    const program = await this.findOne(id);

    try {
      await program.update(updateProgramDto);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar programa');
    }
  }

  async remove(id: string): Promise<void> {
    const program = await this.findOne(id);
    await program.destroy();
  }
}
