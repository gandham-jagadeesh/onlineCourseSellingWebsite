import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from 'src/entites/InstructorEntity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Instructor]),UserModule],
  controllers: [InstructorController],
  providers: [InstructorService],
})
export class InstructorModule {}
