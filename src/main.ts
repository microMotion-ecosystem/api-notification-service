import {config} from 'dotenv';

config();

import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerConfig} from "./config/swagger";
import {RabbitMqConfigModule} from "./config/rabbitmq-config.module";
import {BadRequestException, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    SwaggerConfig.setup(app);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            // forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory: (errors) => new BadRequestException(errors),
        }),
    );
    await RabbitMqConfigModule.setup(app);
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
