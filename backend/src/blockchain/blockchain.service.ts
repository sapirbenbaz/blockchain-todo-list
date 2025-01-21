import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as fs from 'fs';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;

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
    const tasks = await this.contract.getTasks();
    return tasks.map((task: any) => {
      return {
        id: task.id.toString(),
        description: task.description,
        completed: task.completed,
      };
    });
  }

  async addTask(taskDescription: string): Promise<void> {
    try {
      const tx = await this.contract.addTask(taskDescription);
      await tx.wait();
    } catch (error) {
      this.handleBlockchainError(error, 'adding a task');
    }
  }

  async completeTask(taskId: BigInt): Promise<void> {
    try {
      const tx = await this.contract.completeTask(taskId);
      await tx.wait();
    } catch (error) {
      this.handleBlockchainError(error, 'complteing a task');
    }
  }

  private handleBlockchainError(error: any, action: string): void {
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
