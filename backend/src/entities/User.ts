import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { Image } from './Image';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamentos //

  // Imagens criadas pelo usuário
  @OneToMany(() => Image, (image) => image.creator)
  images: Image[];

  // Imagens que o usuário gostou
  @ManyToMany(() => Image, (image) => image.likedBy)
  likedImages: Image[];
}
