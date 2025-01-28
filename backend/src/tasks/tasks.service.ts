import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { BlockchainService } from 'src/blockchain/blockchain.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly blockchainService: BlockchainService) {}

  create(createTaskDto: CreateTaskDto) {
    this.logger.log('Adding a new task');
    return this.blockchainService.addTask(createTaskDto.description);
  }

  findAll() {
    this.logger.log('Getting task');
    return this.blockchainService.getTasks();
  }

  completeTask(id: BigInt) {
    this.logger.log('Completing new task');
    return this.blockchainService.completeTask(id);
  }
}
