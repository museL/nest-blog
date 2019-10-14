import { Injectable, HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from "./users.entity";
import { CryptoUtil } from '../common/utils/crypto.util';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {Result } from '../common/interfaces/result.interface'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
        private readonly jwtService: JwtService

    ) { }

    findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    findOneById(uid: number): Promise<UserEntity> {
        return this.userRepository.findOne(uid);
    }


    async create(user: UserEntity): Promise<UserEntity> {
        const existing = await this.userRepository.findOne({ username: user.username });
        if (existing) throw { code: "400", message: "账号已存在" };
        user.password = this.cryptoUtil.encryptPassword(user.password);
        return this.userRepository.save(this.userRepository.create(user));
    }

    /**
     * 用户登录
     *
     * @param account 登录账号
     * @param password 登录密码
     */
    async login(name: string, password: string): Promise<String> {
        const user = await this.userRepository.findOne({username:name});
        if (!user) throw new HttpException('登录账号有误', 406);
        if (!this.cryptoUtil.checkPassword(password, user.password)) throw new HttpException('登录密码有误', 406);
        const { id } = user;
        const payload = {
            id, name
        }
        const  token:String = this.signToken(payload); 
        console.log(token)
        return token
    }

    signToken(data: JwtModule) {
        return this.jwtService.sign(data);
    }
}
