#!/bin/bash

# Auth Module
mkdir -p src/modules/auth/dto

cat > src/modules/auth/auth.service.ts << 'AUTHSERVICE'
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(firebaseUid: string, email: string, displayName: string, photoURL?: string) {
    return this.usersService.findOrCreate(firebaseUid, email, displayName, photoURL);
  }

  async getMe(firebaseUid: string) {
    return this.usersService.findByFirebaseUid(firebaseUid);
  }
}
AUTHSERVICE

cat > src/modules/auth/auth.controller.ts << 'AUTHCONTROLLER'
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verificar autenticação e obter dados do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async getMe(@CurrentUser() currentUser: any) {
    return this.authService.validateUser(
      currentUser.firebaseUid,
      currentUser.email,
      currentUser.displayName,
      currentUser.photoURL,
    );
  }
}
AUTHCONTROLLER

cat > src/modules/auth/auth.module.ts << 'AUTHMODULE'
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
AUTHMODULE

# SavedPrograms Module
mkdir -p src/modules/saved-programs/dto

cat > src/modules/saved-programs/saved-programs.service.ts << 'SAVEDSERVICE'
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
SAVEDSERVICE

cat > src/modules/saved-programs/saved-programs.controller.ts << 'SAVEDCONTROLLER'
import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SavedProgramsService } from './saved-programs.service';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';

@ApiTags('saved-programs')
@Controller('saved-programs')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
export class SavedProgramsController {
  constructor(
    private readonly savedProgramsService: SavedProgramsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar programas favoritos do usuário' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  async findAll(@CurrentUser() currentUser: any) {
    const user = await this.usersService.findByFirebaseUid(currentUser.firebaseUid);
    return this.savedProgramsService.findByUser(user.id);
  }

  @Post(':programId')
  @ApiOperation({ summary: 'Favoritar programa' })
  @ApiResponse({ status: 201, description: 'Programa favoritado com sucesso' })
  @ApiResponse({ status: 409, description: 'Programa já está nos favoritos' })
  async save(@CurrentUser() currentUser: any, @Param('programId') programId: string) {
    const user = await this.usersService.findByFirebaseUid(currentUser.firebaseUid);
    return this.savedProgramsService.save(user.id, programId);
  }

  @Delete(':programId')
  @ApiOperation({ summary: 'Remover programa dos favoritos' })
  @ApiResponse({ status: 200, description: 'Programa removido dos favoritos' })
  @ApiResponse({ status: 404, description: 'Programa não está nos favoritos' })
  async remove(@CurrentUser() currentUser: any, @Param('programId') programId: string) {
    const user = await this.usersService.findByFirebaseUid(currentUser.firebaseUid);
    await this.savedProgramsService.remove(user.id, programId);
    return { message: 'Programa removido dos favoritos com sucesso' };
  }
}
SAVEDCONTROLLER

cat > src/modules/saved-programs/saved-programs.module.ts << 'SAVEDMODULE'
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
SAVEDMODULE

# Applications Module
mkdir -p src/modules/applications/dto

cat > src/modules/applications/dto/create-application.dto.ts << 'APPDTO'
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ description: 'ID do programa' })
  @IsUUID()
  @IsNotEmpty()
  programId: string;
}
APPDTO

cat > src/modules/applications/applications.service.ts << 'APPSERVICE'
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
APPSERVICE

cat > src/modules/applications/applications.controller.ts << 'APPCONTROLLER'
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
APPCONTROLLER

cat > src/modules/applications/applications.module.ts << 'APPMODULE'
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { Application } from './entities/application.entity';
import { Program } from '../programs/entities/program.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Application, Program]), UsersModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
APPMODULE

# Dashboard Module
mkdir -p src/modules/dashboard/dto

cat > src/modules/dashboard/dashboard.service.ts << 'DASHSERVICE'
import { Injectable } from '@nestjs/common';
import { SavedProgramsService } from '../saved-programs/saved-programs.service';
import { ApplicationsService } from '../applications/applications.service';

@Injectable()
export class DashboardService {
  constructor(
    private savedProgramsService: SavedProgramsService,
    private applicationsService: ApplicationsService,
  ) {}

  async getDashboard(userId: string) {
    const [savedPrograms, applications] = await Promise.all([
      this.savedProgramsService.findByUser(userId),
      this.applicationsService.findByUser(userId),
    ]);

    const acceptedApplications = applications.filter((app) => app.status === 'accepted').length;
    const successRate = applications.length > 0 ? Math.round((acceptedApplications / applications.length) * 100) : 0;

    return {
      stats: {
        programsEnrolled: applications.length,
        savedPrograms: savedPrograms.length,
        eventsParticipated: acceptedApplications,
        successRate: `${successRate}%`,
      },
      recentPrograms: savedPrograms.slice(0, 5),
      recentApplications: applications.slice(0, 5),
    };
  }
}
DASHSERVICE

cat > src/modules/dashboard/dashboard.controller.ts << 'DASHCONTROLLER'
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from '../users/users.service';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(FirebaseAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obter dados do dashboard do usuário' })
  @ApiResponse({ status: 200, description: 'Dashboard retornado com sucesso' })
  async getDashboard(@CurrentUser() currentUser: any) {
    const user = await this.usersService.findByFirebaseUid(currentUser.firebaseUid);
    return this.dashboardService.getDashboard(user.id);
  }
}
DASHCONTROLLER

cat > src/modules/dashboard/dashboard.module.ts << 'DASHMODULE'
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SavedProgramsModule } from '../saved-programs/saved-programs.module';
import { ApplicationsModule } from '../applications/applications.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SavedProgramsModule, ApplicationsModule, UsersModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
DASHMODULE

echo "All remaining modules created successfully!"
