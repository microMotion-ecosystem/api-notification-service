import { IsNotEmpty, IsString, IsOptional, IsObject, IsArray } from 'class-validator';

export class SendNotificationDto {
  @IsNotEmpty()
  @IsArray()
  to: string[];

  @IsNotEmpty()
  @IsString()
  channel: string; // email, sms, msg, in-app, push OR email:Gmail, email:SendGrid, sms:Msegat, msg:Telegram, in-app:OneSignal, push:Firebase

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
  templateData?: { [key: string]: string };

  @IsOptional()
  @IsObject()
  tags?: { [key: string]: string };
}
