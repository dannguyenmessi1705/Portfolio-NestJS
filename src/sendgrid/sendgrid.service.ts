import { Injectable } from '@nestjs/common';
import { SendgridClient } from './sendgrid-client';
import { ConfigService } from '@nestjs/config';
import { MailDataRequired } from '@sendgrid/mail';

type Body = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};
@Injectable()
export class SendgridService {
  constructor(
    private sendgridClient: SendgridClient,
    private configService: ConfigService,
  ) {}

  async sendEmailWithTemplate(recipient: string, body: Body) {
    const mail: MailDataRequired = {
      to: recipient,
      from: this.configService.get<string>('SENDGRID_EMAIL'),
      subject: 'YOU HAVE A NEW MESSAGE',
      templateId: this.configService.get<string>(
        'SENDGRID_TEMPLATE_FORM_EMAIL',
      ),
      dynamicTemplateData: {
        body: body,
      },
    };
    await this.sendgridClient.send(mail);
  }
}
