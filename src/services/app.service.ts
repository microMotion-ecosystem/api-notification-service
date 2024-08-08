import { Injectable } from '@nestjs/common';
import { INotificationLog, NotificationModel } from '../models/notification-log.model';
import { NodemailerService } from './providers/nodemailer.service';
import { TelegramService } from './providers/telegram.service';
import { MsegatSmsService } from './providers/msegat-sms.service';
import { NotificationLogService } from './notification-log.service';
import { SendNotificationDto } from '../dtos/send-notification.dto';
import { IMsegatSendSmsArgs } from './providers/interfaces/msegat.interfaces';

export interface SendNotificationDto1 extends INotificationLog {
  numbers: string;
  msg: string;

  channel: string; // sms, sms:msegat, msg:telegram, email:twilio, in-app, push
  time: string;
  templateName: string;
}

@Injectable()
export class AppService {
  constructor(
    private readonly nodemailerService: NodemailerService,
    private readonly telegramService: TelegramService,
    private readonly msegatSmsService: MsegatSmsService,
    private readonly notificationRepoService: NotificationLogService,
  ) {}

  async sendNotification(args: SendNotificationDto) {
    let res: INotificationLog = null;
    const mainChannel = args.channel.split(':')[0];

    switch (mainChannel) {
      case 'email':
        res = await this.sendEmail(args);
        break;
      case 'sms':
        res = await this.sendSms(args);
        break;
      case 'msg':
        res = await this.sendMsg(args);
        break;
      case 'in-app':
        res = await this.sendInApp(args);
        break;
      case 'push':
        res = await this.sendPushNotification(args);
        break;
      default:
        throw new Error('Invalid channel');
    }

    if (res) {
      this.saveNotificationLog(args, res);
    }

    /*
      res.status = 'failed';
      res.errorCode = msgResponse.code;
      res.errorMessage = msgResponse.message;
      res.metadata.reqBody = args;
    */

    if (res.status !== 'failed') {
      return res;
    } else {
      throw res;
    }
  }

  private async sendEmail(args: SendNotificationDto): Promise<INotificationLog> {
    return;
  }

  private async sendSms(args: SendNotificationDto): Promise<INotificationLog> {
    const msegatSendSmsArgs: IMsegatSendSmsArgs = {
      numbers: args.to.join(','),
      msg: args.msg,
    };
    const msgResponse = await this.msegatSmsService.sendSms(msegatSendSmsArgs);
    if (!msgResponse) {
      throw new Error('Failed to send SMS');
    }
    const logNotification: INotificationLog = {
      channelType: args.channel,
      messageContent: args.msg,
      status: 'sent',
      timestamp: new Date(),
      serviceRequester: 'test',
      metadata: {
        userSender: this.msegatSmsService.userSender,
      },
      tags: {
        ...args.tags,
      },
    };
    if (msgResponse.code.toString() !== '1') {
      logNotification.status = 'failed';
      logNotification.errorCode = msgResponse.code;
      logNotification.errorMessage = msgResponse.message;
      logNotification.metadata.reqBody = args;
    }

    return logNotification;
  }

  private async sendTelegram(args: SendNotificationDto): Promise<INotificationLog> {}

  private async sendMsg(args: SendNotificationDto): Promise<INotificationLog> {}

  private async sendInApp(args: SendNotificationDto): Promise<INotificationLog> {}

  private async sendPushNotification(args: SendNotificationDto) {}

  private async saveNotificationLog(args: SendNotificationDto, res: INotificationLog): Promise<INotificationLog> {
    return await this.notificationRepoService.create(new NotificationModel<INotificationLog>(res));
  }
}
