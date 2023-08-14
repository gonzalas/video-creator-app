import { Module } from '@nestjs/common';
import { InteractionsController } from './interactions.controller';
import { InteractionsService } from './interactions.service';
import { interactionProviders } from './entity/interactions.providers';

@Module({
  controllers: [InteractionsController],
  providers: [InteractionsService, ...interactionProviders],
})
export class InteractionsModule {}
