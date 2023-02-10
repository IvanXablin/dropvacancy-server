import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@m8a/nestjs-typegoose";
import { UserModel } from "../../user/user.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey:configService.get('JWT_SECRET')
    })
  }

  async validate({ _id }: Pick<UserModel, '_id'> ) {
    return this.UserModel.findById(_id).exec();
  }
}