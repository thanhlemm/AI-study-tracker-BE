import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Role]),
    UserModule,
  ],
})export class AuthModule {}
