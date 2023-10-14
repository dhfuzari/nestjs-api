import { join } from 'path';
import { getFileToBuffer } from './get-file-to-buffer';

export const getDocumentMock = async () => {
  const { buffer, stream } = await getFileToBuffer(join(__dirname, 'doc.pdf'));
  const document: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'doc.pdf',
    encoding: '7bit',
    mimetype: 'application/pdf',
    size: 1024 * 50,
    stream,
    destination: '',
    filename: 'file-name',
    path: 'file-path',
    buffer,
  };

  return document;
};
