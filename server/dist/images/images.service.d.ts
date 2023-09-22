/// <reference types="node" />
export declare class ImagesService {
    constructor();
    cloudStorage: (buffer: Buffer) => Promise<{
        id: string;
        url: string;
    }>;
    upload: (file: string) => Promise<{
        id: string;
        url: string;
    }>;
}
