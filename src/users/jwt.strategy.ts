import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException,ExecutionContext } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserEntity }  from './users.entity'
import { GqlExecutionContext } from '@nestjs/graphql';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "6d532fc67244bce003a9e209e035bb46",
    })
  }

  async validate(payload: UserEntity, done: Function) {
    const user = await this.usersService.findOneById(payload.id)
    if (!user) {
      throw new UnauthorizedException('身份验证失败')
    }
    console.log(user)
    done(null, user);
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
