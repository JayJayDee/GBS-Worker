import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column } from 'typeorm';

import { ArticleEntity } from './article-entity';

@Entity()
export class ReplyEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 50,
    comment: 'author of reply'
  })
  public author: string;

  @Column({
    length: 400,
    comment: 'reply (text)'
  })
  public reply: string;

  @CreateDateColumn({
    type: 'timestamp'
  })
  public regDate: Date;

  @ManyToOne((type) => ArticleEntity, (article) => article.replies)
  public article: ArticleEntity;
}
