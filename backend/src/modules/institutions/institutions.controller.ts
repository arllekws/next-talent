import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';

@ApiTags('institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova instituição' })
  @ApiResponse({
    status: 201,
    description: 'Instituição criada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 409, description: 'Instituição já existe' })
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as instituições' })
  @ApiResponse({
    status: 200,
    description: 'Lista de instituições retornada com sucesso',
  })
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar instituição por ID' })
  @ApiResponse({
    status: 200,
    description: 'Instituição encontrada',
  })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada' })
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(id);
  }

  @Get(':id/programs')
  @ApiOperation({ summary: 'Listar programas de uma instituição' })
  @ApiResponse({
    status: 200,
    description: 'Lista de programas retornada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada' })
  findProgramsByInstitution(@Param('id') id: string) {
    return this.institutionsService.findProgramsByInstitution(id);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar instituição' })
  @ApiResponse({
    status: 200,
    description: 'Instituição atualizada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 409, description: 'Nome já existe' })
  update(
    @Param('id') id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionsService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar instituição' })
  @ApiResponse({
    status: 200,
    description: 'Instituição deletada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  remove(@Param('id') id: string) {
    return this.institutionsService.remove(id);
  }
}
