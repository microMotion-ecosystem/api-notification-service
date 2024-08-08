import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { INotificationLogDocument } from '../models/notification-log.model';

@Injectable()
export class NotificationLogService {
  constructor(
    @InjectModel('NotificationLog')
    private readonly notificationModel: Model<INotificationLogDocument>,
  ) {}

  async create(
    notification: INotificationLogDocument,
  ): Promise<INotificationLogDocument> {
    const newNotification = new this.notificationModel(notification);
    return await newNotification.save();
  }

  async findAll(): Promise<INotificationLogDocument[]> {
    return await this.notificationModel.find().exec();
  }

  async findOne(id: string): Promise<INotificationLogDocument> {
    return await this.notificationModel.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    notification: INotificationLogDocument,
  ): Promise<INotificationLogDocument> {
    return this.notificationModel.findByIdAndUpdate(id, notification, {
      new: true,
    });
  }

  //
  // async delete(id: string): Promise<INotification> {
  //     return await this.notificationModel.findByIdAndRemove(id);
  // }
}
