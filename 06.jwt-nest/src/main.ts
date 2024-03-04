import "./mongodb"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser"
import { NextFunction } from "express";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
