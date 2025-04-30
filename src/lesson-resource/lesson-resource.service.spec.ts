import { Test, TestingModule } from '@nestjs/testing';
import { LessonResourceService } from './lesson-resource.service';

describe('LessonResourceService', () => {
  let service: LessonResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonResourceService],
    }).compile();

    service = module.get<LessonResourceService>(LessonResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
