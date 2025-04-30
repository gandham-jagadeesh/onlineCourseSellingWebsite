import { Controller } from '@nestjs/common';
import { LessonResourceService } from './lesson-resource.service';

@Controller('lesson-resource')
export class LessonResourceController {
  constructor(private readonly lessonResourceService: LessonResourceService) {}
}
