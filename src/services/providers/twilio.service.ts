import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';


@Injectable()
export class TwilioService {

    private twilioClient;

    constructor() {
        this.twilioClient = Twilio(
          process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }

    async sendOtp(to: string, body: string): Promise<void> {
        // const from = this.configService.get('TWILIO_PHONE_NUMBER'); // Your Twilio phone number
        await this.twilioClient.messages.create({
            to,
            body
        });
    }
}
