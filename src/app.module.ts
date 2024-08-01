import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './controllers/app.controller';
import {AppService} from './services/app.service';
import {MongodbModule} from './config/mongodb.module';
import {HttpModule} from "@nestjs/axios";
import {AuthApiService} from "./api-services/auth-api/auth-api.service";
import {CheckHeaderMiddleware} from "./core/platform-key-middleware/check-header.middleware";
import {JwtStrategy} from "./core/jwt-auth-guard/jwt.strategy";
import {RabbitMqConfigModule} from "./config/rabbitmq-config.module";
import {EmailService} from './services/email.service';
import {NodemailerService} from './services/providers/nodemailer.service';
import {MailTrapService} from './services/providers/mailtrap.service';
import {TelegramService} from './services/providers/telegram.service';
import {TwilioService} from './services/providers/twilio.service';
import {MsegatSmsService} from './services/providers/msegat-sms.service';
import {MesgatController} from './controllers/mesgat.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { NotificationLogService } from './services/notification-log.service';
import {NotificationModel, NotificationLogSchema} from "./models/notification-log.model";


// @ts-ignore
@Module({
    imports: [
        MongooseModule.forFeature([{name: 'NotificationLog', schema: NotificationLogSchema}]),
        MongodbModule,
        HttpModule,
        RabbitMqConfigModule
    ],
    controllers: [AppController, MesgatController],
    providers: [
        AppService,
        AuthApiService,
        JwtStrategy,
        EmailService,
        NodemailerService,
        MailTrapService,
        TelegramService,
        TwilioService,
        MsegatSmsService,
        {
            provide: 'NotificationLog',
            useFactory: () => NotificationModel,
        },
        NotificationLogService,
    ],
})
export class AppModule implements NestModule {

    // MiddlewareConsumer is used to configure the middleware vvv
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CheckHeaderMiddleware /* , otherMiddleWare */)
            .forRoutes({path: '*', method: RequestMethod.ALL} /* OR AppController */);
        /*  // to implement other middleware:
         consumer
              .apply(NewMiddleware)
              .forRoutes({ path: 'demo', method: RequestMethod.GET });*/

    }

}
