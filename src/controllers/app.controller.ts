import {Body, Controller, Get, Post, Res, UseGuards,} from '@nestjs/common';
import {AppService} from '../services/app.service';
import {Response} from 'express';
import {ApiBearerAuth, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {JwtAuthGuard} from "../core/jwt-auth-guard/jwt-auth.guard";
import {EmailService} from "../services/email.service";
import {SendNotificationDto} from "../dtos/send-notification.dto";
import {MsegatSmsService} from "../services/providers/msegat-sms.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly emailService: EmailService,
        private readonly msegatSmsService: MsegatSmsService,
        ) {
    }


    @Get()
    // @ApiBearerAuth('access-token')
    // @ApiOperation({summary: 'Check if the API is working'})
    // @ApiResponse({status: 200, description: 'API is working correctly.'})
    isWorking(): string {
        return this.appService.isWorking();
    }


    @UseGuards(JwtAuthGuard)
    @Get('api/v1/demo')
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Demo route'})
    @ApiResponse({status: 200, description: 'Returns a demo text.'})
    demo(): string {
        return 'demo';
    }

    // @ApiBearerAuth('access-token')
    @Post('send')
    async sendNotification(
        @Body('to') message: SendNotificationDto,
        @Res() response: Response
    ): Promise<void> {
        try {
            await this.emailService.sendNotification(message);
            response.status(200).send('Email sent successfully');
        } catch (error) {
            response.status(500).send('Failed to send email');
        }
    }

    // @ApiBearerAuth('access-token')
    @Post('send')
    async sendEmail(
        @Body('to') to: string,
        @Body('subject') subject: string,
        @Body('html') html: string,
        @Res() response: Response
    ): Promise<void> {
        try {
            await this.emailService.sendEmail({
                to,
                subject,
                html,
            });
            response.status(200).send('Email sent successfully');
        } catch (error) {
            response.status(500).send('Failed to send email');
        }
    }

    // @ApiBearerAuth('access-token')
    @Post('send')
    async sendMsg(
        @Body('to') to: string,
        @Body('channel') subject: string,
        @Body('msg') html: string,
        @Res() response: Response
    ): Promise<void> {
        try {
            await this.emailService.sendEmail({
                to,
                subject,
                html,
            });
            response.status(200).send('Email sent successfully');
        } catch (error) {
            response.status(500).send('Failed to send email');
        }
    }
    // @ApiBearerAuth('access-token')
    @Post('send-sms')
    async sendSms(
        @Body() body: any,
        @Res() response: Response
    ): Promise<void> {
        try {
          const res = await this.emailService.sendSms(body);
            response.status(200).send(res);
        } catch (error) {
            response.status(500).send(error);
        }
    }



    // @ApiBearerAuth('access-token')
    @Post('send-async')
    async sendRabbit(
        @Body() body: any,
        @Res() response: Response
    ): Promise<void> {
        try {
             await this.msegatSmsService.sendSmsRabbitMq(body);
            response.status(200).send('Email sent successfully');
        } catch (error) {
            response.status(500).send('Failed to send email');
        }
    }




}
