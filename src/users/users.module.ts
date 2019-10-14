import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CryptoUtil } from '../common/utils/crypto.util';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
        secretOrPrivateKey: 'secret12356789'
    })],
    providers: [UsersResolver ,UsersService,CryptoUtil ],
    exports: [UsersService]
})
export class UsersModule { }
