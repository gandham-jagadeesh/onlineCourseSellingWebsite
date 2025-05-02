import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { createLessonDto } from 'src/dtos/create-lesson-dto';
import { S3Service } from 'src/s3/s3.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService,private readonly s3Service:S3Service) {}



  @Post()
  @UseInterceptors(FileInterceptor("profilepic")) //interceptor
  async createLesson(@Body() createLessonDto:createLessonDto,@UploadedFile() file :Express.Multer.File/*here we can use pipe filter and run validations */){
    //gets the buffer and then store in /uploads folder in  memory for today and then
   // this.s3Service.uploadFile({bucketName:"",file,filefilename});
   // console.log(file);
    //console.log(createLessonDto);
    const files = await this.s3Service.getAllFiles();
    console.log(files);
    const response = await this.s3Service.uploadFile(file);
    console.log(response);
  }
}
