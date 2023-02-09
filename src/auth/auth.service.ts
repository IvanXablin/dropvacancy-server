import { Injectable } from '@nestjs/common';
import { InjectModel } from "@m8a/nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";

@Injectable()
export class AuthService {

  constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>) {}

  async register(dto: any) {
      return this.UserModel
  }
}
