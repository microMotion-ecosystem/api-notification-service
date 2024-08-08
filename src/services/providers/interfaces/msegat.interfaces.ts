export interface IMsegatSendSmsArgs {
  numbers: string; //  "966xxxxxx", numbers (required, string, international format without zeros separated by comma)
  msg: string; // msg (required, string, `sms body, example : "Pin Code is: xxxx" or "رمز التحقق: xxxx")
  apiKey?: string; // apiKey (required, string, apiKey associated with the account)
  userName?: string; //  userName (required, string, username for the account in Msegat.com)
  userSender?: string; // 'auth-mseg' userSender (required, string, auth-mseg)
  msgEncoding?: string; //  (required, string, UTF8 or windows-1256)
}

/*
          host: https://www.new.msegat.com/gw/sendsms.php
          user: m.sheikaldin@pinksapp.com
          apiKey: 71269d6f48f346a900455ec0be1fadef
          senderId: pink

      * */

export interface IMsegatGetMessagesArgs {
  apiKey?: string;
  userName?: string;
  numbers: string;
  reqBulkId: string;
  pageNumber: string;
  limit: string;
}

export interface IMsegatSendSmsWithVarsArgs {
  apiKey?: string;
  userName: string;
  userSender: string;
  msg: string;
  numbers: string[]; // msg (required, string, sms body, it should contain the message body including the variables that should be between curly brackets, ex: {variable})
  vars: Array<{ var1: string; var2: string }>;

  timeToSend?: string; // now/later  //  (optional, string, now or later, if not defined = now)
  exactTime?: string; // (optional, string,datetime in format : yyyy-MM-dd HH:mm:ss , if not defined =now`)
  reqBulkId?: string; // (optional, string, true or false, if not defined = false, when user need the msg id of the bulk, he must pass the variable with value = true)
  reqFilter?: string; //  (optional, string, true or false, the system will filter the duplicated numbers, the default value is true`)
}

export interface IMsegatCalculateCostArgs {
  apiKey?: string;
  userName: string;
  contactType: string;
  contacts: string;
  msg: string;
  By: string;
  msgEncoding: string;
}

export interface IMsegatVerifyOTPCodeArgs {
  apiKey?: string; // apiKey (required, string, apiKey associated with the account)
  lang: string; // lang : Ar or En in header
  userName: string; // userName (required, string, username for the account in Msegat.com)
  userSender: string; // userSender (required, string)
  code: string; // code (required, string,the verification code sent to the number via SMS)
  id: 11; // id (required ,the id from the response of the send code API)
}

export interface IMsegatAddSenderArgs {
  apiKey?: string; // apiKey (required, string, apiKey associated with the account)
  userName: string; // userName (required, string, username for the account in Msegat.com)
  senderName: string; // senderName (required, string, should contain only letters, numbers and the maximum length should be 11 characters)
  senderType: string; // senderType (optional, string, normal or whitelist, if not defined = normal)
  userFile: string; // userFile (required, Base64 Encode of Binary file)
}

export interface IMsegatGetSendersArgs {
  apiKey?: string;
  userName: string;
}

export interface IMsegatGetCreditsArgs {
  apiKey?: string;
  userName?: string;
}
