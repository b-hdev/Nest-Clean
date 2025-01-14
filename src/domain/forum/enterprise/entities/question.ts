import { AggregateRoot } from '@/core/entities/aggregate-root';
import { Slug } from './value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import dayjs from 'dayjs';
import { QuestionAttachmentList } from './question-attachment-list';
import { QuestionBestAnswerChosenEvent } from '../events/question-best-answer-chosen-event';

export interface QuestionProps {
  slug: Slug;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID | null;
  attachments: QuestionAttachmentList;
}

export class Question extends AggregateRoot<QuestionProps> {
  get slug() {
    return this.props.slug;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get authorId() {
    return this.props.authorId;
  }

  get attachments() {
    return this.props.attachments;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...');
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);

    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined | null) {
    if (bestAnswerId === undefined || bestAnswerId === null) {
      return;
    }

    if (
      this.props.bestAnswerId === undefined ||
      this.props.bestAnswerId === null ||
      !this.props.bestAnswerId.equals(bestAnswerId)
    ) {
      this.addDomainEvent(
        new QuestionBestAnswerChosenEvent(this, bestAnswerId),
      );
    }

    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return question;
  }
}
