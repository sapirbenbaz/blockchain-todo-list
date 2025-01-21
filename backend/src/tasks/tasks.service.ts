import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { BlockchainService } from 'src/blockchain/blockchain.service';

@Injectable()
export class TasksService {
  constructor(private readonly blockchainService: BlockchainService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.blockchainService.addTask(createTaskDto.description);
  }

  findAll() {
    return this.blockchainService.getTasks();
  }

  completeTask(id: BigInt) {
    return this.blockchainService.completeTask(id);
  }
}
