import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Program } from '../../programs/entities/program.entity';

export enum ApplicationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Table({
  tableName: 'applications',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'program_id'],
    },
  ],
})
export class Application extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  userId: string;

  @ForeignKey(() => Program)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'program_id',
  })
  programId: string;

  @Default(ApplicationStatus.PENDING)
  @Column({
    type: DataType.ENUM(...Object.values(ApplicationStatus)),
    allowNull: false,
  })
  status: ApplicationStatus;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'applied_at',
  })
  appliedAt: Date;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  // Relationships
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Program)
  program: Program;
}
