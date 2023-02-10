import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@m8a/nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { hash, genSalt, compare } from "bcryptjs";
import { UserModel } from "../user/user.model";
import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.getUserFields(user),
      ...tokens
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.UserModel.findOne({ email: dto.email });

    if (oldUser) throw new BadRequestException('User with this email is already in the system!');

    const salt = await genSalt(10);

    const newUser = new this.UserModel( {
      name: dto.name,
      email: dto.email,
      password: await hash(dto.password, salt)
    });

    const user = await newUser.save();

    const tokens = await this.issueTokenPair(String(user._id));

    return {
     user: this.getUserFields(user),
      ...tokens
    }
  }

  async validateUser(dto: AuthDto) {
    const user = await this.UserModel.findOne({ name: dto.name, email: dto.email });

    if (!user) throw new UnauthorizedException('User not found!');

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Invalid Password!');

    return user;
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '14d'
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h'
    });

    return { refreshToken, accessToken };
  }

  getUserFields(user: UserModel) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}
