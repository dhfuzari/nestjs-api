import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private issuer = 'login';
  private audience = 'users';
  private expiresIn = '7 days';

  private issuerForgetPassword = 'forgetPassword';
  private audienceForgetPassword = 'users';
  private expiresInForgetPassword = '30 minutes';

  async createTken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: this.expiresIn,
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidtoken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorreto 123');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email e/ou senha incorreto 3444');
    }

    return this.createTken(user);
  }

  async forget(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Email incorreto');
    }

    const token = await this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: this.expiresInForgetPassword,
        subject: String(user.id),
        issuer: this.issuerForgetPassword,
        audience: this.audienceForgetPassword,
      },
    );

    await this.mailerService.sendMail({
      subject: 'Recuperação de senha',
      to: email,
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });

    return true;
  }

  async reset(password: string, token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuerForgetPassword,
        audience: this.audienceForgetPassword,
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido');
      }

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      await this.userRepository.update(Number(data.id), {
        password,
      });

      const user = await this.userService.readById(Number(data.id));

      return this.createTken(user);
    } catch (error) {
      throw new BadRequestException(error);
    }

    // TODO: Get user id from given token
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createTken(user);
  }
}
