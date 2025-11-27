import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';

@ApiTags('applications')
@Controller('applications')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar inscrição em programa' })
  @ApiResponse({ status: 201, description: 'Inscrição criada com sucesso' })
  @ApiResponse({ status: 409, description: 'Já inscrito neste programa' })
  async create(@CurrentUser() currentUser: any, @Body() createApplicationDto: CreateApplicationDto) {
    const user = await this.usersService.findByFirebaseUid(currentUser.firebaseUid);
    return this.applicationsService.create(user.id, createApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar inscrições do usuário' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  async findAll(@CurrentUser() currentUser: any) {
    const user = await this.usersService.findByFirebaseUid(currentUser.firebaseUid);
    return this.applicationsService.findByUser(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar inscrição por ID' })
  @ApiResponse({ status: 200, description: 'Inscrição encontrada' })
  @ApiResponse({ status: 404, description: 'Inscrição não encontrada' })
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }
}
