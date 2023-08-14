import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PROVIDERS_REPOSITORY } from '../constants/providers';
import { AuthGuard } from './guards/auth.guards';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: PROVIDERS_REPOSITORY.APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    UsersModule,
    // JwtModule.register({
    //   global: true,
    //   secret: 'secret',
    //   signOptions: { expiresIn: '60s' },
    // }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_AUTH_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME ?? '60s',
        },
      }),
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
