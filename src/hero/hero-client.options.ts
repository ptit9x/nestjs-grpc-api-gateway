import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const heroClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_URL_BASE_SERVICE,
    package: 'hero', // ['hero', 'hero2']
    protoPath: join(__dirname, '../../../proto/hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
  },
};
