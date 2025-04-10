import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host:"localhost",
      port:3306,
      type:"mysql",
      username:"root",
      password:"password",
      database:"db",
      synchronize:true,
      autoLoadEntities:true
    }),
    UserModule,
    ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
