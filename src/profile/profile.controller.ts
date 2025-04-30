import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entites/ProfileEntity';
import { Repository } from 'typeorm';

@Controller('profile')
export class ProfileController {
    constructor(){}


}