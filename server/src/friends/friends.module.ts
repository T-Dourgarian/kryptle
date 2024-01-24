import { Module } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { FriendsController } from "./friends.controller";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({})],
    controllers: [FriendsController],
    providers: [FriendsService]
})
export class FriendsModule {}