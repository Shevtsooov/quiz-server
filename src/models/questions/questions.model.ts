import {
  AllowNull,
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'questions',
  createdAt: false,
  updatedAt: false,
})
export class Questions extends Model {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  answers: string[];

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  correctAnswer: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  category: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  categoryName: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  difficulty: string | null;
}

export default Questions;
