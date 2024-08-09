import { vi } from 'vitest';
import { AggregateRoot } from '../entities/aggregate-root';
import { UniqueEntityID } from '../entities/unique-entity-id';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  // eslint-disable-next-line no-use-before-define
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn();

    // Subscriber cadastrado
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // Criando uma resposta sem salvar no banco
    const aggregate = CustomAggregate.create();

    // Evento registrado porém não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1);

    // Salvando a resposta no banco de dados
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // subscriber ouve o evento e faz o disparo
    expect(callbackSpy).toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
