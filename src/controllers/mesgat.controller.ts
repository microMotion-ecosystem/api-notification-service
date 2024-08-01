import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {MsegatSmsService} from "../services/providers/msegat-sms.service";
import {Response} from "express";
import {EventPattern} from "@nestjs/microservices";

@Controller('mesgat')
export class MesgatController {
    constructor(private msegatSmsService: MsegatSmsService) {
    }


    // @ApiBearerAuth('access-token')
    @Post('send-sms')
    async sendSms(
        @Body('to') to: string,
        @Body('msg') msg: string,
        @Res() response: Response
    ): Promise<void> {
        try {
            const res = await this.msegatSmsService.sendSms({
                msg: msg,
                numbers: to,
            });
            response.status(200).send(res);
        } catch (error) {
            response.status(500).send('Failed to send email');
        }
    }

    @Get('credits')
    async getCredits(
        @Res() response: Response
    ): Promise<void> {
        try {
            const res = await this.msegatSmsService.getCredits({});
            response.status(200).send(res.toString());
        } catch (error) {
            response.status(500).send(error);
        }
    }


    // @ApiBearerAuth('access-token')
    @Post('send-otp')
    async sendOtp(
        @Body('to') to: string,
        @Res() response: Response
    ): Promise<void> {
        try {
            const res = await this.msegatSmsService.sendOTPCode({
                number: to,
            });
            response.status(200).send(res);
        } catch (error) {
            response.status(500).send('Failed to send OTP');
        }
    }

    // @ApiBearerAuth('access-token')
    @Post('send-adv')
    async sendSmsWithVars(
        @Body() body: any,
        @Res() response: Response
    ): Promise<void> {
        try {
            const res = await this.msegatSmsService.sendSmsWithVars(body);
            response.status(200).send(res);
        } catch (error) {
            response.status(500).send('Failed to send OTP');
        }
    }


    @EventPattern('send_sms_event')
    async handleSendSms(data: any) {
        // Handle the SMS sending logic here
        console.log('SMS data received:', data);
        // Add your SMS sending logic here
        // await this.sendSms(data);
    }



 /*   @Post('send-sms-rabbitmq')
    async rabbitMqSendSms(@Body() data: any) {
        await this.rabbitMqProducerService.sendSms(data);
    }*/
}
