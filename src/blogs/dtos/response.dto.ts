import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/users.entity';

export class BlogResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  excerpt: string;

  @Expose()
  coverImage: string;

  @Expose()
  @Transform(({ obj }) => {
    const user: User = obj.user;
    const { name, image, ...rest } = user;
    return { name, image };
  })
  user: {
    name: string;
    image: string;
  };
  
  @Expose()
  content: string;
}
