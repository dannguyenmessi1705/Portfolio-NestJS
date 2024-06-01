import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { Mail } from '../dtos/send-email';

@Processor('send-email')
export class SendEmailConsumer {
  constructor(private sendGrid: SendgridService) {}

  @Process('contact')
  async contactEmail(job: Job<Mail>) {
    await this.sendGrid.sendEmailWithTemplate(
      process.env.SENDGRID_EMAIL,
      job.data,
    );
  }
}
