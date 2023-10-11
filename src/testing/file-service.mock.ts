import { FileService } from '../file/file.service';

export const fileServiceMock = {
  provide: FileService,
  useValue: {
    getDestination: jest.fn(),
    upload: jest.fn().mockResolvedValue(''),
  },
};
