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

@Table({
  tableName: 'saved_programs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'program_id'], // <-- IMPORTANTE!
    },
  ],
})
export class SavedProgram extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',      // <-- corrige para snake_case
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Program)
  @Column({
    field: 'program_id',   // <-- corrige para snake_case
    type: DataType.UUID,
    allowNull: false,
  })
  programId: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Program)
  program: Program;
}
