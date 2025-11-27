import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FilterProgramDto } from './dto/filter-program.dto';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';

@ApiTags('programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo programa' })
  @ApiResponse({
    status: 201,
    description: 'Programa criado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os programas com filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de programas retornada com sucesso',
  })
  @ApiQuery({ name: 'area', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'level', required: false, enum: ['Júnior', 'Pleno', 'Sênior'] })
  @ApiQuery({ name: 'status', required: false, enum: ['open', 'closing-soon', 'closed'] })
  @ApiQuery({ name: 'tags', required: false, type: String })
  @ApiQuery({ name: 'deadline', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() filters: FilterProgramDto) {
    return this.programsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar programa por ID' })
  @ApiResponse({
    status: 200,
    description: 'Programa encontrado',
  })
  @ApiResponse({ status: 404, description: 'Programa não encontrado' })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar programa' })
  @ApiResponse({
    status: 200,
    description: 'Programa atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Programa não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar programa' })
  @ApiResponse({
    status: 200,
    description: 'Programa deletado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Programa não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}
