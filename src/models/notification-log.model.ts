import mongoose, {Schema, model, Document} from 'mongoose';

export interface INotificationLog {
    channelType: string;
    messageContent: string;
    status: string;
    timestamp: Date;
    errorCode?: string;
    errorMessage?: string;
    serviceRequester: string;
    metadata: Record<string, unknown>;
    tags: Record<string, unknown>;
}

export interface INotificationLogDocument extends INotificationLog, Document {
}

export const NotificationLogSchema = new mongoose.Schema({
    channelType: {type: String, required: true},
    messageContent: {type: String, required: true},
    status: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    errorCode: String,
    errorMessage: String,
    serviceRequester: {type: String, required: true},
    metadata: {type: mongoose.Schema.Types.Mixed, default: {}},
    tags: {type: mongoose.Schema.Types.Mixed, default: {}},
}, {timestamps: true});

export const NotificationModel = model<INotificationLogDocument>('NotificationLog', NotificationLogSchema);
