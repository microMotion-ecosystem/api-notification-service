import { Body, Controller, Get, Post, Res, Headers, UseGuards, Req } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../core/jwt-auth-guard/jwt-auth.guard';
import { EmailService } from '../services/email.service';
import { SendNotificationDto } from '../dtos/send-notification.dto';
import { MsegatSmsService } from '../services/providers/msegat-sms.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
    private readonly msegatSmsService: MsegatSmsService,
  ) {}

  @Get()
  isWorking(): string {
    return `"${process.env.APP_NAME}" App is Working (${process.env.APP_ENV}) ${process.env.APP_VERSION}
            ${new Date().toDateString()} ${new Date().toTimeString()}.
            Please check the API documentation at "/api-docs" OR "/api-docs-json"`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/v1/demo')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Demo route' })
  @ApiResponse({ status: 200, description: 'Returns a demo text.' })
  demo(): string {
    return 'demo';
  }

  // @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendNotification(
    @Body() message: SendNotificationDto,
    @Res() response: Response,
    @Headers() headers: Record<string, string>,
    @Req() req: Request,
  ): Promise<void> {
    try {
      if (!Object.keys(message.tags)) {
        message.tags = {};
      }
      message.tags['clientService'] = headers['X-Client-service'];

      const user = (req as any).user; // Type assertion to access user object
      if (user) {
        // TODO: Complete and Test the user object
        message.tags['userId'] = user.userId;
      }
      await this.appService.sendNotification(message);
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
    @Res() response: Response,
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
    @Res() response: Response,
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

  // // @ApiBearerAuth('access-token')
  // @Post('send-sms')
  // async sendSms(@Body() body: any, @Res() response: Response): Promise<void> {
  //   try {
  //     const res = await this.emailService.sendSms(body);
  //     response.status(200).send(res);
  //   } catch (error) {
  //     response.status(500).send(error);
  //   }
  // }

  // @ApiBearerAuth('access-token')
  @Post('send-async')
  async sendRabbit(@Body() body: any, @Res() response: Response): Promise<void> {
    try {
      await this.msegatSmsService.sendSmsRabbitMq(body);
      response.status(200).send('Email sent successfully');
    } catch (error) {
      response.status(500).send('Failed to send email');
    }
  }
}
