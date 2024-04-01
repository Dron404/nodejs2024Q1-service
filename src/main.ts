import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;
  const logger = new CustomLogger();
  const config = new DocumentBuilder()
    .setTitle('	Home Library Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  process.on('unhandledRejection', async (reason) => {
    logger.fatal(`[unhandledRejection]:`, `${reason}`);
  });

  process.on('uncaughtException', async (reason) => {
    logger.error(`[uncaughtException]:\n${JSON.stringify(reason)}`);
  });
  await app.listen(PORT);
  console.log(`App start on  port - ${PORT}`);
  console.log(`Swagger docs --> http://localhost:${PORT}/doc`);
}

bootstrap();
