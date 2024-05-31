import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailDataRequired, default as Sendgrid } from '@sendgrid/mail';

@Injectable()
export class SendgridClient {
  constructor(private configService: ConfigService) {
    Sendgrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async send(mail: MailDataRequired) {
    try {
      console.log(mail);
      await Sendgrid.send(mail);
    } catch (error) {
      throw new InternalServerErrorException('Error sending email');
    }
  }
}
