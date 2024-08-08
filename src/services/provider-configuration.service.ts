/* eslint-disable */
import { Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as process from 'node:process';
import * as fs from 'fs';


export interface ProviderConfig {
  name: string
  channel: string
  objectType: string
  host?: string
  port?: number
  secure?: boolean
  from?: string
  user?: string
  password?: string
  apiKey?: string
  senderId?: string
  accountSid?: string
  authToken?: string
  apiSecret?: string
  authId?: string
  username?: number
  botToken?: string
  webhook?: string
}




@Injectable()
export class ProviderConfigurationService {
  private providersConfigs: ProviderConfig[] = [];

  constructor() {
    this.loadProvidersConfig();
  }

  private loadProvidersConfig() {
    const filePath: string = process.env.PROVIDERS_CONFIGS_URL || 'providers.yaml';

    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = yaml.load(fileContents) as { providers: ProviderConfig[] };
      this.providersConfigs = data.providers;
    } catch (e) {
      console.error(e);
      throw new Error('Error loading providers.yaml configuration');
    }
  }

  get(providerName: string) {
    return this.providersConfigs.find((provider) => provider.name === providerName);
  }
  getByChannel(channel: string) {
    return this.providersConfigs.find((provider) => provider.channel.startsWith(channel));
  }
  getAllByChannel(channel: string) {
    return this.providersConfigs.filter((provider) => provider.channel.startsWith(channel));
  }
  addProviderConfig(providerConfig: any) {
    this.providersConfigs.push(providerConfig);
  }
}
