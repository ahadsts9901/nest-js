import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryService } from './cloudinary.service';

@Module({
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule { }
