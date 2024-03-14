import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  root(@Res() res: Response) {
    const html = readFileSync(join(__dirname, "..", 'sts', 'index.html'), 'utf8');
    res.send(html);
  }
}