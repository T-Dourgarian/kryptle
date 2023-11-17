import { Module } from '@nestjs/common';
import { KryptoModule } from './krypto/krypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { SolutionModule } from './solution/solution.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ KryptoModule, SolutionModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }) ],
  controllers: [],
  providers: [],
})
export class AppModule {}
