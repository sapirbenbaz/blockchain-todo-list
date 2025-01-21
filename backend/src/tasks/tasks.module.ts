import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [BlockchainModule],
})
export class TasksModule {}
