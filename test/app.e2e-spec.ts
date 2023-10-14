import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthRegisterDTOMock } from '../src/testing/auth-register.dto.mock';
import { Role } from '../src/enums/role.enum';
import { AuthRegisterAdminDTOMock } from '../src/testing/auth-register-admin.dto.mock';
import dataSource from '../typeorm/data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(AuthRegisterDTOMock);

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
  });

  it('Login with new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: AuthRegisterDTOMock.email,
        password: AuthRegisterDTOMock.password,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('Get user data', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);
  });

  it('Register a new user as Admin', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(AuthRegisterAdminDTOMock);

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('Check if user type is User(1) after try to register an Admin(2) user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    userId = response.body.id;
  });

  it('Get 403 on try to see all users list as a User(1) role', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  it('Manually change user to Admin role', async () => {
    const ds = await dataSource.initialize();

    const queryRunner = ds.createQueryRunner();

    await queryRunner.query(`
      UPDATE users SET role = ${Role.Admin} WHERE id = ${userId}
    `);

    const rows = await queryRunner.query(`
      SELECT * FROM users WHERE id = ${userId}
    `);

    expect(rows.length).toEqual(1);
    expect(rows[0].role).toEqual(Role.Admin);

    dataSource.destroy();
  });

  it('Try to see all users list after change user role to Admin(2)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
});
