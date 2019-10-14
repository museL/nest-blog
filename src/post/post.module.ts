import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from "./post.entity";
import { UsersModule } from '../users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([Post]),UsersModule],
  providers: [PostService, PostResolver]
})
export class PostModule {}
