import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsObject, IsArray,
} from 'class-validator';

export class SendNotificationDto {
  @IsNotEmpty()
  @IsArray()
  to: string[];

  @IsNotEmpty()
  @IsString()
  channel: string;

  @IsNotEmpty()
  msg: string;

  @IsOptional()
  @IsString()
  templateName?: string;

  @IsOptional()
  @IsString()
  layout?: string;

  @IsOptional()
  @IsObject()
  templateData?: { [key:string]: string };

}
