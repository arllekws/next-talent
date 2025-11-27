import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { SavedProgram } from '../../saved-programs/entities/saved-program.entity';
import { Application } from '../../applications/entities/application.entity';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at', // 👈 define o nome certo no banco
  updatedAt: 'updated_at', // 👈 define o nome certo no banco
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Unique
  @Column({
    field: 'firebase_uid',
    type: DataType.STRING,
    allowNull: false,
  })
  firebaseUid: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    field: 'display_name',
    type: DataType.STRING,
    allowNull: true,
  })
  displayName: string;

  @Column({
    field: 'photo_url',
    type: DataType.STRING,
    allowNull: true,
  })
  photoURL: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: [],
  })
  interests: string[];

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: [],
  })
  preferences: string[];

  @CreatedAt
  @Column({ field: 'created_at' })   // 👈 CORRIGIDO
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })   // 👈 CORRIGIDO
  updatedAt: Date;

  // Relationships
  @HasMany(() => SavedProgram)
  savedPrograms: SavedProgram[];

  @HasMany(() => Application)
  applications: Application[];
}
