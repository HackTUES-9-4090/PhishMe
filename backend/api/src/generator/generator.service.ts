import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class GeneratorService {
  private openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }),
  );

  public async generatePhishingEmail(data: any): Promise<string> {
    const { messages, messageType, theme, relationShip } = data;
    const { sender, receiver, url } = data.config;

    if (!messages || !messageType || !theme || !relationShip) {
      return 'Missing parameters';
    }

    const prompt = this.generatePrompt(
      messages,
      messageType,
      theme,
      relationShip,
      sender,
      receiver,
      url,
    );

    return this.generateSolicitationText(prompt);
  }

  generateSolicitationText = async (prompt: string) => {
    return (
      await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.8,
        max_tokens: 100,
      })
    ).data.choices[0].text;
  };

  generatePrompt = (
    messages: Array<any>,
    messageType: string,
    theme: string,
    relationShip: string,
    sender: string,
    receiver: string,
    url: string,
  ) =>
    `${sender} would like to send ${receiver} a message. Use the writing of style of ${sender} and the information, present in these messages ${messages
      .filter((message) => message.sender == sender)
      .map(
        (message) => message.text,
      )}. Use the context of the messages ${receiver} has sent ${messages
      .filter((message) => message.sender == receiver)
      .map(
        (message) => message.text,
      )}.  Create a ${messageType} message with the writing style of ${sender} and persuade ${receiver} ${
      url == 'link'
        ? 'to click on a link that is labeled as LINK'
        : `to give their own credentials to ${sender}`
    }. ${theme ? `The message has to pertain to a theme of ${theme}` : ''} ${
      relationShip ? `. ${sender} is a ${relationShip} to ${receiver}` : ''
    }`;
}
