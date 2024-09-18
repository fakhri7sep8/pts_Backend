
import { Test, TestingModule } from '@nestjs/testing';
import {SiswaController } from './siswa.controller';

describe('BookController', () => {
  let controller:SiswaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiswaController],
    }).compile();

    controller = module.get<SiswaController>(SiswaController);
  });

  it('tidak dapat menemukan', () => {
    expect(controller).toBeDefined();
  });
});