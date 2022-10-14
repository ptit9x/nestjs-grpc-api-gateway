import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const userClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_URL_USER_SERVICE,
    package: 'user', // ['hero', 'hero2']
    protoPath: join(__dirname, '../../../proto/user.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
  },
};
