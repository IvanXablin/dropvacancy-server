import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { UserModel } from "../user/user.model";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: "user"
        }
      }
    ]),
    ConfigModule,
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
