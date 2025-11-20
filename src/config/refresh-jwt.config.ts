import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET,

    expiresIn: parseInt(process.env.REFRESH_JWT_EXPIRE_IN as string) || 604800,
  }),
);
