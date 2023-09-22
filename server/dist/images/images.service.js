"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const streamifier = require('streamifier');
let ImagesService = class ImagesService {
    constructor() {
        this.cloudStorage = async (buffer) => {
            const stream = await new Promise((resolve, reject) => {
                const cld_upload_stream = cloudinary_1.v2.uploader.upload_stream({
                    folder: 'waves_upload',
                }, function (error, result) {
                    if (result) {
                        resolve(result);
                    }
                    else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(buffer).pipe(cld_upload_stream);
            });
            return { id: stream.public_id, url: stream.secure_url };
        };
        this.upload = async (file) => {
            const upload = await cloudinary_1.v2.uploader.upload(file, {
                public_id: `${Date.now()}`,
                folder: 'waves_upload',
            });
            return { id: upload.public_id, url: upload.url };
        };
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            shorten: true,
            secure: true,
            ssl_detected: true,
        });
    }
};
ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map