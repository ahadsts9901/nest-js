import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class AppService {

  constructor(private readonly cloudinaryService: CloudinaryService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async file(file: any, body: any) {

    const res: any = await this.cloudinaryService.uploadImage(file.path)
    return {
      "uploaded image": res.url,
      "body": body
    }

  }

}
