import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('	Home Library Service')
    .setDescription('Assignment: REST Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  await app.listen(PORT);
  console.log(`App start on  port - ${PORT}`);
  console.log(`Swagger docs --> http://localhost:${PORT}/doc`);
}

bootstrap();
