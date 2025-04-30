import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Module({
  providers: [EnrollmentService]
})
export class EnrollmentModule {}
