import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhotoMock } from '../testing/get-photo.mock';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(fileService).toBeDefined();
  });

  describe('FileService methods', () => {
    it('shoul upload a file', async () => {
      const photo = await getPhotoMock();
      const fileName = 'photo-test.png';
      fileService.upload(photo, fileName);
    });
  });
});
