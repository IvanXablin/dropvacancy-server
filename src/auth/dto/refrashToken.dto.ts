import { IsString } from "class-validator";

export class RefrashTokenDto {
  @IsString()
  refreshToken: string
}