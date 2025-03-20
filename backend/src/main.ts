import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ClassSerializerInterceptor, LoggerService, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const loggerService = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER)

  const configService = app.get<ConfigService>(ConfigService)

  app.enableCors();

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(new GlobalExceptionFilter(loggerService));


  const config = new DocumentBuilder()
    .setTitle('EasyGenerator API')
    .setDescription('This server responsible for handle user sign up & login with protected route to get user info')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT || 5555;

  await app.listen(port, () => {
    console.log(`server start listen on port:${configService.get<string>('PORT')}`,)

  });

  app.useLogger(loggerService);





  process.on('unhandledRejection', (error) => {
    loggerService.error(`unhandledRejection ${error}`, error);
  });

  process.on('uncaughtException', (error) => {
    loggerService.error(`uncaughtException ${error}`, error);
  });
}
bootstrap();
