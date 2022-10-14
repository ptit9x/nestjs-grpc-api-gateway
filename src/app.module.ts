import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [HeroModule, UserModule],
})
export class AppModule {}
