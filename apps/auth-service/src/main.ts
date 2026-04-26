import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AllExceptionsFilter, LoggingInterceptor, TransformInterceptor } from "@furniro/common";

async function bootstrap() {
  const logger = new Logger("AuthService");
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle("Furniro Auth Service")
    .setDescription("Authentication microservice")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 8001;
  await app.listen(port, "0.0.0.0");
  logger.log(`Auth Service running on port ${port}`);
  logger.log(`🚀 Swagger Docs: http://localhost:${port}/api/docs`);
}
bootstrap();
