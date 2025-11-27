import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { InstitutionsModule } from './modules/institutions/institutions.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { SavedProgramsModule } from './modules/saved-programs/saved-programs.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'nexttalent',
      autoLoadModels: true,
      synchronize: false, // Use migrations instead
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    ProgramsModule,
    InstitutionsModule,
    ApplicationsModule,
    SavedProgramsModule,
    DashboardModule,
  ],
})
export class AppModule {}
