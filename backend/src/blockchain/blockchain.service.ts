import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as fs from 'fs';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;
  private readonly logger = new Logger(BlockchainService.name);

  constructor(private readonly configService: ConfigService) {
    const rpcUrl = this.configService.get('RPC_URL');
    const walletPrivateKey = this.configService.get(
      'WALLET_PRIVATE_KEY',
    ) as string;
    const smartContractAddress = this.configService.get(
      'SMART_CONTRACT_ADDRESS',
    ) as string;
    const abiPath = this.configService.get('ABI_PATH') as string;
    const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(walletPrivateKey, this.provider);
    this.contract = new ethers.Contract(smartContractAddress, abi, this.wallet);
  }

  async getTasks(): Promise<Task[]> {
    try {
      this.logger.log('Getting tasks from blockchain');
      const tasks = await this.contract.getTasks();
      this.logger.log('Got tasks from blockchain successfully');
      return tasks.map((task: Task) => {
        return {
          id: task.id.toString(),
          description: task.description,
          completed: task.completed,
        };
      });
    } catch (error) {
      this.logger.error(
        'Failed to get tasks from blockchain. Throwing an error',
      );
      this.handleBlockchainError(error, 'getting tasks');
    }
  }

  async addTask(taskDescription: string): Promise<void> {
    try {
      this.logger.log('Adding a new task to blockchain');
      const tx = await this.contract.addTask(taskDescription);
      await tx.wait();
      this.logger.log('Added a new task to blockchain successfully');
    } catch (error) {
      this.logger.error('Failed to add a new task to blockchain');
      this.handleBlockchainError(error, 'adding a task');
    }
  }

  async completeTask(taskId: BigInt): Promise<void> {
    try {
      this.logger.log('Completing a task on blockchain');
      const tx = await this.contract.completeTask(taskId);
      await tx.wait();
      this.logger.log('Completed a new task to blockchain successfully');
    } catch (error) {
      this.logger.error('Failed to complete task on blockchain');

      this.handleBlockchainError(error, 'complteing a task');
    }
  }

  private handleBlockchainError(error: any, action: string): never {
    const errorMap = {
      'Task is already completed': 'The task has already been completed',
      'Task does not exist': 'The task ID provided does not exist',
      'Description cannot be empty': 'A task has to contain a description',
    };

    const errorMessage = errorMap[error.reason];
    if (errorMessage) {
      console.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }

    console.error('An unexpected error occurred:', error);
    throw new Error(`An unexpected error occurred while ${action}`);
  }
}
