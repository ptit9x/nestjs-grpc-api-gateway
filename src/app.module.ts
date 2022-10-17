import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HeroModule } from './hero/hero.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [HeroModule, UserModule, AuthModule],
})
export class AppModule {}
