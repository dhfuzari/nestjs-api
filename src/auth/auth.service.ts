import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createTken() {
    // return this.jwtService.sign();
  }

  async checkToken(token: string) {
    // return this.jwtService.verify();
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorreto');
    }

    return user;
  }

  async forget(email: string) {
    const user = await this.prisma.users.findFirst({
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

    await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
