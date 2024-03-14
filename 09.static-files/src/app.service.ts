import { Injectable } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
