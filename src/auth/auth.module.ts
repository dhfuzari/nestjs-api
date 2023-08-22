import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'pr#p=idl5+dO6IC$igu@r7jlt&h&nlph',
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
