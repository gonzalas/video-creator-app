import { Injectable } from '@nestjs/common';
import { makePublisher, makeSubscriber } from 'amqp-simple-pub-sub';

@Injectable()
export class PubSubService {
  private publisher;
  private subscriber;

  constructor(exchange: string, queueName: string, keys: string[]) {
    this.publisher = makePublisher({ exchange });
    this.subscriber = makeSubscriber({
      exchange,
      queueName,
      routingKeys: keys,
    });
  }

  async publishMessage(key: string, message: string): Promise<void> {
    await this.publisher.start();
    this.publisher.publish(key, message);
  }

  subscribeToQueue(message: string): void {
    this.subscriber.start(this.subscriber.ack(message));
  }
}
