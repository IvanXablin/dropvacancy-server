import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "@m8a/nestjs-typegoose";
export const getMongoDBConfig = async (configService: ConfigService):Promise<TypegooseModuleOptions> => ({
  uri: configService.get('MONGO_URI')
});