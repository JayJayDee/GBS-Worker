import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArticleEntity } from './article-entity';

enum ContentTypeEnum {
  IMAGE = 'image',
  TEXT = 'text'
}
type ContentType = 'image' | 'text';

@Entity()
export class ContentEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'enum',
    enum: ContentTypeEnum
  })
  public type: ContentType;

  @ManyToOne((type) => ArticleEntity, (article) => article.contents)
  public article: ArticleEntity;
}