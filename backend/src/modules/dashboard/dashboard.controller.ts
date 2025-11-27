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
