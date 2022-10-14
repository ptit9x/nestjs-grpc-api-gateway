import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { userClientOptions } from './user-client.options';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        ...userClientOptions,
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
