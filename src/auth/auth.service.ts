import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createTken(user: users) {
    return {
      accessToken: this.jwtService.sign(
        {
          ud: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'API NestJS - Login',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken(token: string) {
    // return this.jwtService.verify();
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorreto');
    }

    return this.createTken(user);
  }

  async forget(email: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email incorreto');
    }

    // TODO: enviar email com link para resetar senha

    return true;
  }

  async reset(password: string, token: string) {
    // TODO: Validar o token. Trocar a senha do usuário

    // TODO: Get user id from given token
    const id = 0;

    const user = await this.prismaService.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createTken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createTken(user);
  }
}
