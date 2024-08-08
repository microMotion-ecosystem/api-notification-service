import { Injectable } from '@nestjs/common';
import { NodemailerService } from './providers/nodemailer.service';
import { TelegramService } from './providers/telegram.service';
import { SendNotificationDto } from '../dtos/send-notification.dto';
import { MsegatSmsService } from './providers/msegat-sms.service';
import { NotificationLogService } from './notification-log.service';

interface DefaultEmailArgs {
  to: string;
  subject: string;
  from?: string;
  provider?: 'nodemailer:Gmail' | 'nodemailer:SMTP' | string;
}

export interface SendEmailArgs extends DefaultEmailArgs {
  html: string;
}

export interface SendEmailTemplateArgs extends DefaultEmailArgs {
  templateName: string;
  data: { [key: string]: string };
}

export interface SendMsgArgs extends DefaultEmailArgs {
  to: string;
  text: string;
  from?: string;
  channel?: 'telegram' | 'slack' | 'sms' | 'whatsapp' | string;
}

@Injectable()
export class EmailService {
  constructor(
    private readonly nodemailerService: NodemailerService,
    private readonly telegramService: TelegramService,
    private readonly msegatSmsService: MsegatSmsService,
    private readonly notificationRepoService: NotificationLogService,
  ) {}

  from: string = 'hazem.xmotion@gmail.com';
  defaultService: string = 'nodemailer:Gmail';

  async sendNotification(args: SendNotificationDto): Promise<void> {
    switch (args.channel) {
      case 'email':
        // result = "One";
        break;
      case 'email_':
        // result = "One";
        break;
      case 'sms':
        // result = "Two";
        break;
      case 'whatsapp':
        // result = "Two";
        break;
      case 'telegram':
        // result = "Two";
        break;
      case 'slack':
        // result = "Two";
        break;

      default:
      // result = "Other";
    }

    /*        if (args.channel === 'email') {
                await this.sendEmail({
                    to: args.to,
                    subject: args.subject,
                    html: args.html
                });
            } else if (args.channel === 'telegram') {
                await this.sendMsg({
                    to: args.to,
                    text: args.text
                });
            }*/
  }

  async sendEmail(args: SendEmailArgs): Promise<void> {
    return await this.nodemailerService.sendEmail(
      args.to,
      args.subject,
      args.html,
    );
  }

  async sendEmailTemplate(args: SendEmailTemplateArgs): Promise<void> {}



}
