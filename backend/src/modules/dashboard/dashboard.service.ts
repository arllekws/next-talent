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
