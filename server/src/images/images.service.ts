import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';

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

    console.log('process.env.CLOUDINARY_NAME', process.env.CLOUDINARY_NAME);
  }

  cloudStorage = async (file: string) => {
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
