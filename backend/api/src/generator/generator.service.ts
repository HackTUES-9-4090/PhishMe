import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { EmailResponse } from './interfaces/response.interface';

@Injectable()
export class GeneratorService {
  private openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }),
  );

  public async generatePhishingEmail(data: any): Promise<EmailResponse> {
    const { messages, messageType, theme, relationShip } = data;
    const { sender, receiver, url } = data.config;

    if (!messages || !messageType || !theme || !relationShip) {
      return {
        message: 'Missing parameters',
        success: false,
      };
    }

    const prompt = this.generatePrompt(
      messages[0],
      messages[1],
      messageType,
      theme,
      relationShip,
      sender,
      receiver,
      url,
    );

    const res = await this.generateSolicitationText(prompt);

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
    to click on a link that is labeled as ${url}'.
    ${theme ? `The message has to pertain to a theme of ${theme}` : ''} ${
      relationship
        ? `. ${sender} is in a ${relationship} relationship to ${receiver}`
        : ''
    }`;
}
