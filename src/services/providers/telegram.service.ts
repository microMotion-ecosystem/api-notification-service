import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as process from "node:process";


@Injectable()
export class TelegramService {  private readonly bot: TelegramBot;

    constructor() {
        // Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you got from BotFather
        this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN , { polling: true });

        this.initializeMessageHandling();
    }

    private initializeMessageHandling(): void {
        this.bot.on('message', (msg) => {
            const chatId = msg.chat.id;

            // Echo the message back to the user
            this.bot.sendMessage(chatId, `Received your message: ${msg.text}`);
        });
    }

    public async sendMessage(chatId: string, message: string): Promise<TelegramBot.Message> {
        return await this.bot.sendMessage(chatId, message);
    }
    public async sendOTP(telegramUsername: string, otp: string): Promise<void> {
        const chatId = await this.resolveChatIdFromUsername(telegramUsername);
        // @ts-ignore
        if (chatId) {
            this.bot.sendMessage(chatId, `Your OTP is: ${otp}`);
        } else {
            throw new Error('Failed to resolve Telegram chat ID.');
        }
    }

    private async resolveChatIdFromUsername(telegramUsername: string) {

    }
}
