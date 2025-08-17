import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from './User';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imageUrl: string;

  @Column()
  downloadUrl: string;

  @Column()
  promptDetails: string;

  @Column()
  negativePrompt: string;

  @Column()
  inputResolution: string;

  @Column()
  seed: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamentos //

  // Relacionamento com o usuário que criou a imagem
  @ManyToOne(() => User, (user) => user.images, { eager: false })
  creator: User;

  // Relacionamento com os usuários que curtiram a imagem
  @ManyToMany(() => User, (user) => user.likedImages, { eager: false })
  @JoinTable()
  likedBy: User[];
}
