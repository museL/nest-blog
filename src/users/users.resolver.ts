import { Query, Mutation, Resolver, ResolveProperty,Args} from "@nestjs/graphql";
import { UserEntity } from "./users.entity";
import { UsersService } from "./users.service";
import { Result } from '../common/interfaces/result.interface';
import {GqlAuthGuard } from '../common/Guard/GraphqlAuthGuard'
import { Injectable, HttpException, Inject ,UseGuards} from '@nestjs/common';
@Resolver('Users')
export class UsersResolver {

    constructor(
        private readonly usersService: UsersService
    ) { }

    // query{
    //     users
    //   {
    //     id
    //   }
    // }
    @Query('users')
    @UseGuards(GqlAuthGuard)
    async getUsers(): Promise<UserEntity[]> {
        return await this.usersService.findAll();;
    }

    // mutation{
    //   login(username:"lzx",password:"123456")
    //   {
    //     code
    //     message
    //   }
    // }
    @Mutation('login')
    async login(@Args('username') username, @Args('password') password): Promise<Result> {        
        const token = await this.usersService.login(username, password);
        return { code: 200, message: '登录成功',token };
    }
    // mutation{
    //     createUser(user:{
    //       username:"lzx",
    //       password:"123456",
    //       email:"123123"
    //     })
    //     {
    //       code
    //       message
    //     }
    //   }
    @Mutation('createUser')
    async createUser(@Args('user') user): Promise<Result> {
        await this.usersService.create(user);
        return { code: 200, message: '注册成功' }
    }
}
