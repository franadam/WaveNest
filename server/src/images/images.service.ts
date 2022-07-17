import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
const streamifier = require('streamifier');

@Injectable()
export class ImagesService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      shorten: true,
      secure: true,
      ssl_detected: true,
    });
  }

  cloudStorage = async (buffer: Buffer) => {
    const stream: UploadApiResponse = await new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: 'waves_upload',
        },
        function (error, result) {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
    });

    return { id: stream.public_id, url: stream.secure_url };
  };

  upload = async (file: string) => {
    // filename = req.file.path from multer
    const upload = await cloudinary.uploader.upload(file, {
      public_id: `${Date.now()}`,
      folder: 'waves_upload',
      // unique_filename: true,
      // quality_analysis: true,
    });
    return { id: upload.public_id, url: upload.url };
  };
}
