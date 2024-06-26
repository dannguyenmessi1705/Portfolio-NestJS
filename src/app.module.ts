import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { SocketModule } from './socket/socket.module';
import { BlogsModule } from './blogs/blogs.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisCacheConfig } from './config/redis-cache.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { BullConfig } from './config/queue-bull.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env?.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    SendgridModule,
    SocketModule,
    BlogsModule,
    ProjectsModule,
    UsersModule,
    CacheModule.registerAsync(RedisCacheConfig),
    BullModule.forRootAsync(BullConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
