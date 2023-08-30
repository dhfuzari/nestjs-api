import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string) {
    return await writeFile(path, file.buffer);
  }

  async uploadFiles(
    files: {
      photo: Express.Multer.File;
      documents: Express.Multer.File;
    },
    path: string,
  ) {
    await writeFile(path, files.photo.buffer);
    await writeFile(path, files.documents.buffer);
  }
}
