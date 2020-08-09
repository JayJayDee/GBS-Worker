import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ContentEntity } from './content-entity';
import { ReplyEntity } from './reply-entity';

enum SiteEnum {
  DOGDRIP = 'dogdrip',
  CLIEN = 'clien'
}
type Site = 'dogdrip' | 'clien';

@Entity()
export class ArticleEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'enum',
    enum: SiteEnum
  })
  public site: Site;

  @CreateDateColumn({
    type: 'timestamp'
  })
  public regDate: Date;

  @OneToMany((type) => ContentEntity, (content) => content.article)
  public contents: ContentEntity[];

  @OneToMany((type) => ReplyEntity, (reply) => reply.article)
  public replies: ReplyEntity[];
}
