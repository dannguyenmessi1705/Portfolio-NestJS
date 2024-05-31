import { Injectable } from '@nestjs/common';
import { SendgridClient } from './sendgrid-client';
import { ConfigService } from '@nestjs/config';
import { MailDataRequired } from '@sendgrid/mail';
import { Mail } from 'src/users/dtos/send-email';

@Injectable()
export class SendgridService {
  constructor(
    private sendgridClient: SendgridClient,
    private configService: ConfigService,
  ) {}

  async sendEmailWithTemplate(recipient: string, body: Mail) {
    const mail: MailDataRequired = {
      to: this.configService.get<string>('SENDGRID_TO_EMAIL'),
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL'),
      subject: 'YOU HAVE A NEW MESSAGE',
      templateId: this.configService.get<string>(
        'SENDGRID_TEMPLATE_FORM_EMAIL',
      ),
      dynamicTemplateData: body,
    };
    await this.sendgridClient.send(mail);
  }
}
