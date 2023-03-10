import { AttackDto } from '@/attack/dtos';
import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { EmailResponse } from './interfaces/response.interface';
import { AttackTargetDto } from '@/attack/dtos';
import { Logger } from '@nestjs/common';

interface EmailData {
  attack: AttackDto;
  target: AttackTargetDto;
}

@Injectable()
export class GeneratorService {
  private openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }),
  );

  private readonly logger = new Logger(GeneratorService.name);

  public async generatePhishingEmail(data: EmailData): Promise<EmailResponse> {
    this.logger.log('Generating phishing email');

    if (!data.attack.scrapeUrl) {
      this.logger.log('No url present');
    }

    const {
      communicationType: messageType,
      fromName: sender,
      theme,
      scrapeUrl: url,
    } = data.attack;

    const relationShip = 'friend';

    const { name: receiver, fromMessages, toMessages } = data.target;

    const prompt = this.generatePrompt(
      fromMessages,
      toMessages,
      messageType,
      theme,
      relationShip,
      sender,
      receiver,
      url,
    );

    const res = await this.generateSolicitationText(prompt);

    // this.logger.log('Generated phishing email: ' + res);

    return {
      message: res,
      success: true,
    };
  }

  generateSolicitationText = async (prompt: string) => {
    return (
      await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.8,
        max_tokens: 250,
      })
    ).data.choices[0].text;
  };

  generatePrompt = (
    senderMessages: Array<any>,
    receiverMessages: Array<any>,
    messageType: string,
    theme: string,
    relationship: string,
    sender: string,
    receiver: string,
    url: string,
  ) =>
    `${sender} would like to send ${receiver} an email. Use the writing of style of ${sender} and the information, present in these messages ${senderMessages}. 
    Use the context of the messages - ${receiverMessages}. Create a ${messageType} message with the writing style of ${sender} and persuade ${receiver} 
    ${
      url
        ? `to click on a link that is labeled as ${url}`
        : `To send login credentials for something related to the theme.`
    }'.
    ${theme ? `The message has to pertain to a theme of ${theme}` : ''} ${
      relationship
        ? `. ${sender} is in a ${relationship} relationship to ${receiver}`
        : ''
    }`;
}
