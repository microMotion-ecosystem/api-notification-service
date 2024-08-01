import {Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {lastValueFrom} from "rxjs";
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import {ClientProxy} from "@nestjs/microservices";
import {
    MsegatAddSenderArgs,
    MsegatCalculateCostArgs,
    MsegatGetCreditsArgs,
    MsegatGetMessagesArgs, MsegatGetSendersArgs,
    MsegatSendSmsArgs,
    MsegatSendSmsWithVarsArgs, MsegatVerifyOTPCodeArgs
} from "./models/msegat.interfaces";



interface MsegatSendOTPCodeArgs {
    lang?: string;
    userName?: string;
    number: string;
    apiKey?: string;
    userSender?: string;
}

@Injectable()
export class MsegatSmsService {

    baseURL = 'https://www.msegat.com/gw';
    userName: string = 'm.sheikaldin@pinksapp.com'
    apiKey: string = '71269d6f48f346a900455ec0be1fadef'
    senderId: string = 'pink'



    constructor(private httpService: HttpService,
                @Inject('NOTIFICATION_SERVICE') private readonly rabbitMq: ClientProxy,
                @Inject('AUTH_SERVICE') private readonly rabbitMq1: ClientProxy
    ) {
        const providerData = this.getProviderData('providers.yaml', 'msg_sms');
        if (providerData) {
            this.baseURL = providerData.host;
            this.userName = providerData.user;
            this.apiKey = providerData.apiKey;
            this.senderId = providerData.senderId;
        } else {
            throw new Error('Provider msg_sms not found in providers.yaml');
        }
    }


    private getProviderData(filePath: string, providerName: string) {
        try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const data = yaml.load(fileContents) as { providers: any[] };
            return data.providers.find(provider => provider.name === providerName);
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    async getCredits(data: MsegatGetCreditsArgs): Promise<any> {
        const formData = new FormData();
        formData.append('userName', data.userName || this.userName);
        formData.append('apiKey', data.apiKey || this.apiKey);

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/Credits.php`, formData, {headers})
        );
        console.log(response.data);
        return response.data;
    }

    async sendSms(data: MsegatSendSmsArgs): Promise<any> {
        const headers = {
            'Content-Type': 'application/json'
        };

        // Set default values if not provided
        data.apiKey = data.apiKey || this.apiKey;
        data.userSender = data.userSender || this.senderId;
        data.userName = data.userName || this.userName;

        // Remove undefined parameters
        const cleanedData = this.removeUndefinedParams(data);

  console.log('Sending SMS with data:', cleanedData);
        // Make the HTTP POST request
        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/sendsms.php`, cleanedData, { headers })
        );
        console.log(response.data);
        return response.data;
    }

    async getMessages(data: MsegatGetMessagesArgs): Promise<void> {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (!data.apiKey) {
            data.apiKey = this.apiKey;
        }
        if (!data.apiKey) {
            data.userName = this.userName;
        }

        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/getMessages.php`, data, {headers})
        );
        console.log(response.data);
    }

    async sendSmsWithVars(data: MsegatSendSmsWithVarsArgs): Promise<void> {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (!data.apiKey) {
            data.apiKey = this.apiKey;
        }
        if (!data.userSender) {
            data.userSender = this.senderId;
        }
        if (!data.apiKey) {
            data.userName = this.userName;
        }

        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/sendVars.php`, data, {headers})
        );
        console.log(response.data);
        return response.data;
    }

    async calculateCost(data: MsegatCalculateCostArgs): Promise<void> {
        const formData = new FormData();
        formData.append('userName', data.userName || this.userName);
        formData.append('apiKey', data.apiKey || this.apiKey);
        formData.append('contactType', data.contactType);
        formData.append('contacts', data.contacts);
        formData.append('msg', data.msg);
        formData.append('By', data.By);
        formData.append('msgEncoding', data.msgEncoding || 'UTF8');

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/calculateCost.php`, formData, {headers})
        );
        console.log(response.data);
    }


    async addSender(data: MsegatAddSenderArgs): Promise<void> {
        const formData = new FormData();
        formData.append('userName', data.userName || this.userName);
        formData.append('apiKey', data.apiKey || this.apiKey);
        formData.append('senderName', data.senderName);
        formData.append('senderType', data.senderType);
        formData.append('userFile', data.userFile);

        const headers = {
            'Content-Type': 'multipart/form-data'
        };

        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/addSender.php`, formData, {headers})
        );
        console.log(response.data);
    }

    async getSenders(data: MsegatGetSendersArgs): Promise<void> {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (!data.apiKey) {
            data.apiKey = this.apiKey;
        }
        if (!data.apiKey) {
            data.userName = this.userName;
        }
        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/senders.php`, data, {headers})
        );
        console.log(response.data);
    }

    async sendOTPCode(data: MsegatSendOTPCodeArgs): Promise<any> {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        if (!data.apiKey) {
            data.apiKey = this.apiKey;
        }
        if (!data.lang) {
            data.lang = 'Ar';
        }
        if (!data.userSender) {
            data.userSender = this.senderId;
        }
        if (!data.apiKey) {
            data.userName = this.userName;
        }
        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/sendOTPCode.php`, data, {headers})
        );
        console.log(response.data);
        return response.data;
    }

    async verifyOTPCode(data: MsegatVerifyOTPCodeArgs): Promise<any> {
        const headers = {
            'Content-Type': 'multipart/form-data'
        };
        if (!data.apiKey) {
            data.apiKey = this.apiKey;
        }
        if (!data.userSender) {
            data.userSender = this.senderId;
        }
        if (!data.apiKey) {
            data.userName = this.userName;
        }
        const response = await lastValueFrom(
            this.httpService.post(`${this.baseURL}/verifyOTPCode.php`, data, {headers})
        );
        console.log(response.data);
        return response.data;
    }

    private removeUndefinedParams(obj: Record<string, any>): Record<string, any> {
        for (let prop in obj) {
            if (obj[prop] === undefined) {
                delete obj[prop];
            }
        }
        return obj;
    }





    async sendSmsRabbitMq(data: any) {
       const ad =  this.rabbitMq.emit('send_sms_event', data);
       const ad2 =  this.rabbitMq1.emit('send_sms_event', data);

       return ad;
    }
}
