import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 50 })
  username: string;

  @Column() password: string;

  @Column({ length: 50 })
  email: string;

  @OneToMany(type => Post, post => post.user)
    posts: Post[];
}
