import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blogs.entity';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { diskStorage } from 'fastify-multer';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    FastifyMulterModule.register({
      fileFilter: (req, file, cb) => {
        if (
          (req.body && file.originalname.match(/\.(md|txt|doc|docx|html)$/)) ||
          !file.originalname.match(/\.(jpg|jpeg|png|md)$/)
        ) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: 'public/images/blogs',
        filename: (req: any, file, cb) => {
          // @ts-ignore
          cb(
            null,
            req.body.title.replace(/\s/g, '') +
              '-' +
              Date.now() +
              '.' +
              file.originalname.split('.')[1],
          );
        },
      }),
    }),
    UsersModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
