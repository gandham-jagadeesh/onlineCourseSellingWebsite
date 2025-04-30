import { Test, TestingModule } from '@nestjs/testing';
import { LessonResourceController } from './lesson-resource.controller';
import { LessonResourceService } from './lesson-resource.service';

describe('LessonResourceController', () => {
  let controller: LessonResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonResourceController],
      providers: [LessonResourceService],
    }).compile();

    controller = module.get<LessonResourceController>(LessonResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
