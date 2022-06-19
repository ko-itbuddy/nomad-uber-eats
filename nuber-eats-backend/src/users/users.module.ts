import { JwtService } from './../jwt/jwt.service';
import { JwtModule } from './../jwt/jwt.module';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigService],
  providers: [UsersResolver, UsersService]
})
export class UsersModule { }
