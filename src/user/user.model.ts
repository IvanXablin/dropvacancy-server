import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Prop } from "@typegoose/typegoose";

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @Prop()
  name: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
}