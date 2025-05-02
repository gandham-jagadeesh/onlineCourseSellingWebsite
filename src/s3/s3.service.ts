import { Injectable } from '@nestjs/common';

import {S3Client,PutObjectCommand,ListObjectsCommand, DeleteObjectCommand, S3, GetObjectCommand} from "@aws-sdk/client-s3"
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
        try{
        const insert = new PutObjectCommand({
            Key:file.filename+".png",
            Body:file.buffer,
            ContentLength:file.size,
            ContentType:file.mimetype,
            Bucket:this.bucketname,
        });
       const savedFileObject  = await this.s3client.send(insert);
      return savedFileObject;
    }
    catch(ex){
            console.log(ex);
        }
    }

    async getAllFiles(){
        const getFiles = new ListObjectsCommand({
          Bucket:this.bucketname
        });
        const  data = await this.s3client.send(getFiles);
        return data;
    }


    async deleteFile(fileId:string){   
        //check whether file exists or not then delete can i do the both if exists then delete
        const deleteFile = new DeleteObjectCommand({
            Bucket:this.bucketname,
            Key:fileId
        })
        const deletedFile = await this.s3client.send(deleteFile);
        return deletedFile;
    }


    async update(fileId:string,file:Express.Multer.File){
        const updateFile = new PutObjectCommand({
            Key:fileId,
            Bucket:this.bucketname,
            Body:file.buffer
        })
    const updatedFile  = await this.s3client.send(updateFile);
    return updatedFile;

    }

    async createPutPresignedUrl(client:S3Client,command:PutObjectCommand,expiresIn:number){
        const   putsignedUrl:string = await getSignedUrl(client,command,{expiresIn:expiresIn});
        return putsignedUrl;
    }

    async createGetPresignedUrl(client:S3Client,command:GetObjectCommand,expiresIn:number){
        const signedUrl:string = await getSignedUrl(client,command,{expiresIn:expiresIn});
        return signedUrl;
    }

}
