import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entites/ProfileEntity';

@Module({
  imports:[TypeOrmModule.forFeature([Profile])],
  providers: [ ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
