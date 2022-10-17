import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserController } from './user.controller';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from './user.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_URL_USER_SERVICE,
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/user.proto'),
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
