import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { SendgridClient } from './sendgrid-client';

@Module({
  providers: [SendgridService, SendgridClient],
  exports: [SendgridService],
})
export class SendgridModule {}
