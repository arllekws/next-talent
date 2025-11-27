import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Institution } from '../../institutions/entities/institution.entity';
import { SavedProgram } from '../../saved-programs/entities/saved-program.entity';
import { Application } from '../../applications/entities/application.entity';

export enum ProgramStatus {
  OPEN = 'open',
  CLOSING_SOON = 'closing-soon',
  CLOSED = 'closed',
}

export enum ProgramLevel {
  JUNIOR = 'Júnior',
  PLENO = 'Pleno',
  SENIOR = 'Sênior',
}

@Table({
  tableName: 'programs',
  timestamps: true,
})
export class Program extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    field: 'id',
  })
  id: string;

  @ForeignKey(() => Institution)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'institution_id',
  })
  institutionId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title',
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'type',
  })
  type: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'deadline',
  })
  deadline: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'description',
  })
  description: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'participants',
  })
  participants: number;

  @Default(ProgramStatus.OPEN)
  @Column({
    type: DataType.ENUM(...Object.values(ProgramStatus)),
    allowNull: false,
    field: 'status',
  })
  status: ProgramStatus;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    field: 'tags',
  })
  tags: string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'area',
  })
  area: string;

  @Column({
    type: DataType.ENUM(...Object.values(ProgramLevel)),
    allowNull: true,
    field: 'level',
  })
  level: ProgramLevel;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;

  // Relationships
  @BelongsTo(() => Institution)
  institution: Institution;

  @HasMany(() => SavedProgram)
  savedPrograms: SavedProgram[];

  @HasMany(() => Application)
  applications: Application[];
}
