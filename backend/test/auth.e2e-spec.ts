import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { LoginDto } from '../src/auth/dtos/login.dto';
import { SignupDto } from '../src/auth/dtos/signup.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;

  // Mock AuthService
  const mockAuthService = {
    signUp: jest.fn().mockImplementation((dto: SignupDto) => {
      if (!dto.email.includes('@') || dto.password.length < 6) {
        throw new BadRequestException('Invalid input data'); // Simulate validation failure
      }
      return { accessToken: 'mocked-access-token', user: { id: '123', email: dto.email, name: dto.name } };
    }),

    signIn: jest.fn().mockImplementation((dto: LoginDto) => {
      if (dto.password !== 'StrongPass123!') {
        throw new UnauthorizedException('Invalid Credentials'); // Throw proper HTTP exception
      }
      return { accessToken: 'mocked-access-token' };
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService) // Replace real AuthService with mock
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should successfully sign up a user', async () => {
      const signupDto: SignupDto = {
        email: 'test@example.com',
        password: 'StrongPass123!',
        name: 'userName',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupDto)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('accessToken', 'mocked-access-token');
      expect(mockAuthService.signUp).toHaveBeenCalledWith(signupDto);
    });

    it('should return 400 when signup data is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: 'invalid-email', password: '123' }) // Invalid data
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('/auth/signin (POST)', () => {
    it('should successfully log in a user', async () => {
      const loginDto: LoginDto = { email: 'test@example.com', password: 'StrongPass123!' };

      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(loginDto)
        .expect(HttpStatus.OK);

      expect(response.body).toHaveProperty('accessToken', 'mocked-access-token');
      expect(mockAuthService.signIn).toHaveBeenCalledWith(loginDto);
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'test@example.com', password: 'WrongPass!' }) // Wrong password
        .expect(HttpStatus.UNAUTHORIZED);

      expect(response.body).toHaveProperty('message', 'Invalid Credentials');
      expect(mockAuthService.signIn).toHaveBeenCalled();
    });
  });
});
