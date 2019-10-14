import { Injectable, HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from "./post.entity";
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
    ) { }

    /***
     * 创建帖子
     * 
     * @param createInput createInput
     */
    async create(createInput: Post): Promise<void> {
        console.log(createInput);
        await this.postRepo.save(this.postRepo.create(createInput));
    }

    /**
     * 分页查询帖子
     *
     * @param pageSize 一页数量
     *  
     * @param  pageIndex 页数
     */


    async findOneBypageSize(pageSize: number, pageIndex: number): Promise<Post[]> {
        return await this.postRepo.createQueryBuilder('post').skip((pageIndex-1)*pageSize).take(pageSize)
            .getMany();
    }
    /**
     * 查询帖子
     *
     * @param id 帖子ID
     */
    async findOneById(id: number): Promise<Post> {
        return await this.postRepo.findOne(id);
    }
    /**
     * 删除帖子
     *
     * @param id 帖子ID
     */
    async remove(id: number): Promise<void> {
        const existing = await this.findOneById(id);
        if (!existing) throw new HttpException(`删除失败，ID 为 '${id}' 的帖子不存在`, 404);
        await this.postRepo.remove(existing);
    }

    /**
     * 更新帖子
     *
     * @param id 帖子ID
     * @param updateInput updateInput
     */
    async update(id: number, updateInput: Post): Promise<void> {
        const existing = await this.findOneById(id);
        if (!existing) throw new HttpException(`更新失败，ID 为 '${id}' 的帖子不存在`, 404);
        if (updateInput.title) existing.title = updateInput.title;
        if (updateInput.content) existing.content = updateInput.content;
        await this.postRepo.save(existing);
    }
}
