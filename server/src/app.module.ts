import { Module } from '@nestjs/common';
import { KryptoModule } from './krypto/krypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ KryptoModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }) ],
  controllers: [],
  providers: [],
})
export class AppModule {}
