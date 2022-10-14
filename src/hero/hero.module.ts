import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { heroClientOptions } from './hero-client.options';
import { HeroController } from './hero.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...heroClientOptions,
      },
    ]),
  ],
  controllers: [HeroController],
})
export class HeroModule {}
