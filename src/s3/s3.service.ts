import { ConsoleLogger, Injectable } from '@nestjs/common';

import {S3Client,PutObjectCommand,  ListObjectsCommand} from "@aws-sdk/client-s3"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
    
    private s3client:S3Client;
    private bucketname:string;

    constructor(private readonly configService:ConfigService){
        this.s3client = new S3Client({
            region:configService.get<string>("AWS_REGION")!,
            credentials:{
                secretAccessKey:configService.get<string>("AWS_SECRET_ACCESS_KEY")!,
                accessKeyId:configService.get<string>("AWS_ACCESS_KEY_ID")!
            },
        });
        this.bucketname = configService.get("AWS_S3_BUCKET_NAME")!
    }


    async uploadFile(file:Express.Multer.File){
        //const insert = new PutObjectCommand();
        try{
            console.log(file);
        console.log(this.configService.get<string>("AWS_REGION"));
        console.log(this.configService.get<string>("AWS_SECRET_ACCESS_KEY"));
        console.log(this.configService.get<string>("AWS_ACCESS_KEY_ID"));
        console.log(this.configService.get("AWS_S3_BUCKET_NAME"));
        const insert = new PutObjectCommand({
            Key:file.filename,
            Body:file.buffer,
            Bucket:this.bucketname,
        });
       const response = await this.s3client.send(insert);
    //   const getAllFiles = await this.s3client.send(new ListObjectsCommand({
    //     Bucket:this.bucketname
    //   }));
    console.log(response.ETag);
      return response;
        }catch(ex){
            console.log(ex);
        }
    }

    async getAllFiles(){
        
        const getFiles = new ListObjectsCommand({
          Bucket:this.bucketname
        });
        let data = await this.s3client.send(getFiles);
        console.log(data);
    }
}
