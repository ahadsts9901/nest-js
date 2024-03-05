import multer, { diskStorage } from "multer"

// multer storage config
export const storageConfig: any = diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        // console.log("mul-file: ", file); // here your processed file
        cb(null, `image-${new Date().getTime()}-${file.originalname}`)
    }
})