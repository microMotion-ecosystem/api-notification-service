import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ProviderConfigurationService } from '../provider-configuration.service';

interface MailTrapOptions {
  host: string;
  port: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

@Injectable()
export class NodemailerService {
  private transporter: { [key: string]: nodemailer.Transporter<any> };

  mailgunOptions: MailTrapOptions = {
    host: process.env.EMAIL_MAILGUN_HOST,
    port: Number(process.env.EMAIL_MAILGUN_PORT),
    secure: process.env.EMAIL_MAILGUN_SECURE === 'true' || false,
    auth: {
      user: process.env.EMAIL_MAILGUN_USER, // your Mailtrap username
      pass: process.env.EMAIL_MAILGUN_PASSWORD, // your Mailtrap password
    },
  };

  mailTrapOptions: MailTrapOptions = {
    host: process.env.EMAIL_MAILTRAP_HOST,
    port: Number(process.env.EMAIL_MAILTRAP_PORT) || 2525,
    secure: process.env.EMAIL_MAILTRAP_SECURE === 'true' || false,
    auth: {
      user: process.env.EMAIL_MAILTRAP_USER || '112e16f6e352be', // your Mailtrap username
      pass: process.env.EMAIL_MAILTRAP_PASSWORD || 'eea46f3b79938c', // your Mailtrap password
    },
  };

  gmailOptions: any = {
    service: process.env.MAIL_SERVICE || 'Gmail', // e.g., 'Gmail'
    auth: {
      user: process.env.MAIL_USER || 'striker.h@gmail.com',
      pass: process.env.MAIL_PASSWORD || 'llll imnq wyie tdsp',
    },
  };

  mailjetOptions: MailTrapOptions = {
    host: process.env.EMAIL_MAILJET_HOST,
    port: Number(process.env.EMAIL_MAILJET_PORT),
    secure: process.env.EMAIL_MAILJET_SECURE === 'true' || false,
    auth: {
      user: process.env.EMAIL_MAILJET_USER, // your Mailtrap username
      pass: process.env.EMAIL_MAILJET_PASSWORD, // your Mailtrap password
    },
  };

  constructor(private providerConfig: ProviderConfigurationService) {
    this.transporter = {
      gmail: nodemailer.createTransport(this.gmailOptions),
      mailTrap: nodemailer.createTransport(this.mailTrapOptions),
      mailgun: nodemailer.createTransport(this.mailgunOptions),
      mailjet: nodemailer.createTransport(this.mailjetOptions),
    };
  }

  private validateSTMPConfig(provider: any): void {


  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: 'hazem.xmotion@gmail.com',
      to,
      subject,
      html,
    };

    try {
      console.log('Sending email', this.transporter['mailjet']);
      const response = await this.transporter['mailjet'].sendMail(mailOptions);
      console.log('Email sent successfully', response);
      // if (response && response.response === '250 2.0.0 Ok: queued') {
      //     console.log('Email sent successfully');
      // }else {
      //     throw new Error( response);
      // }
    } catch (error) {
      console.error('Failed to send email', error);
      throw error;
    }
  }
}
