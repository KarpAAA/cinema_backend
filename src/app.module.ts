import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import config from "./config/typeorm-data-source.config";
import {jwtConstants} from "./constants";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "./modules/users/users.module";
import {MoviesModule} from "./modules/movies/movies.module";
import {SessionsModule} from "./modules/sessions/sessions.module";
import {HallsModule} from "./modules/halls/halls.module";
import { GoodsModule } from './modules/goods/goods.module';
import { OperationsModule } from './modules/operations/operations.module';
import { FinancesModule } from './modules/finances/finances.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
    HallsModule,
    SessionsModule,
    MoviesModule,
    AuthModule,
    GoodsModule,
    OperationsModule,
    FinancesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
