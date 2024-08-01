import { Global, INestApplication, Module } from "@nestjs/common";
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

//  npm install @nestjs/microservices amqplib amqp-connection-manager

@Global()
@Module({
  imports: [
    //   For Send or Emit
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.RABBITMQ_QUEUE_NAME,
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'MicroMotion_Auth',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})


export class RabbitMqConfigModule {
  static async setup(app: INestApplication<any>) {
    // for receive or consume message
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,

      options: {

        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_QUEUE_NAME,

        queueOptions: {
          durable: false,

        },
      },
    });
    await app.startAllMicroservices();
  }
}
