import { Module } from '@nestjs/common';
import { KryptoModule } from './krypto/krypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { SolutionModule } from './solution/solution.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RefreshKryptoModule } from './refreshKrypto/refreshKrypto.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ 
    RefreshKryptoModule, 
    KryptoModule, 
    StatsModule, 
    SolutionModule, 
    PrismaModule, 
    ConfigModule.forRoot({ isGlobal: true }), 
    ScheduleModule.forRoot(), 
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build')
    })
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard
  }],
})
export class AppModule {}
