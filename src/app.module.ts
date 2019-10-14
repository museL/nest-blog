import { Module } from '@nestjs/common';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { JwtStrategy } from './users/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

const passportModule = PassportModule.register({
	defaultStrategy: 'jwt'
})
@Module({
	imports: [TypeOrmModule.forRoot(), JwtModule.register({
		secretOrPrivateKey: '1AGy4bCUoECDZ4yI6h8DxHDwgj84EqStMNyab8nPChQ=',
		signOptions: {
			expiresIn: '12h'
		}
	}),
	PassportModule.register({
		defaultStrategy: 'jwt'
	}), GraphQLModule.forRoot({
		typePaths: ['./**/*.graphql'],
		context: ({ req }) => ({ req })
	}), passportModule,
		UsersModule, PostModule],
	controllers: [],
	providers: [JwtStrategy],
	exports: [
		passportModule
	]
})
export class AppModule { }
