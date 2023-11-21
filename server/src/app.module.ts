import { Module } from '@nestjs/common';
import { KryptoModule } from './krypto/krypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { SolutionModule } from './solution/solution.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RefreshKryptoModule } from './refreshKrypto/refreshKrypto.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ RefreshKryptoModule, KryptoModule, SolutionModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot(), AuthModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
