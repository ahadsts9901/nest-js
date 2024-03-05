import { Injectable } from "@nestjs/common";
import {v2 as cloudinary } from "cloudinary"
import "dotenv/config"

@Injectable()
export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    }

    async uploadImage(filePath: string) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(filePath, { folder: "nest-file" }, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }

}