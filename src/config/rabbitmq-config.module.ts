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
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,

        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.RABBITMQ_QUEUE_NAME,

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
