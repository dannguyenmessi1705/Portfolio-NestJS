import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

export const BullConfig: SharedBullAsyncConfiguration = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    },
  }),
};
