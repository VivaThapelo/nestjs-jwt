import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    const email: string = 'vivathapelo@gmail.com';
    const password: string = 'Menu@#384';
    it('should return "Hello World!"', () => {
      expect(appController.login({ email, password })).toBe('Hello World!');
    });
  });
});
