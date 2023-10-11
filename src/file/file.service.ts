import { Injectable } from '@nestjs/common';
import { PathLike } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  getDestinationPath() {
    return join(__dirname, '..', '..', 'storage');
  }

  async upload(file: Express.Multer.File, fileName: string) {
    const path: PathLike = join(this.getDestinationPath(), fileName);
    await writeFile(path, file.buffer);
    return path;
  }

  async uploadFiles(files: {
    photo: Express.Multer.File;
    documents: Express.Multer.File;
  }) {
    const pathPhoto: PathLike = join(
      this.getDestinationPath(),
      files.photo.filename,
    );
    const pathDoc: PathLike = join(
      this.getDestinationPath(),
      files.documents.filename,
    );
    await writeFile(pathPhoto, files.photo.buffer);
    await writeFile(pathDoc, files.documents.buffer);

    return { pathPhoto, pathDoc };
  }
}
