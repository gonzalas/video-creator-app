import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middlewares
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Open API
  const config = new DocumentBuilder()
    .setTitle('Videos App')
    .setDescription('The videos app api endpoints')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      description: 'Bearer token',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS
  const corsConfig = {
    origin: [],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  };
  process.env.NODE_ENV !== 'prd' &&
    corsConfig.origin.concat(/localhost\:${PORT}$/);
  app.enableCors(corsConfig);

  // Listen
  await app.listen(PORT);
}
bootstrap();
