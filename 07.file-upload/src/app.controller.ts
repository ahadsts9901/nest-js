import { Controller, Post, UploadedFile, Body, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { storageConfig } from './multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // entry point of file upload api
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', { storage: storageConfig }), // this storage config is from multer
  )
  uploadFileAndPassValidation(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.appService.file(file, body)
  }


}