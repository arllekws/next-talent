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
