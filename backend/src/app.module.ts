import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    TasksModule,
    BlockchainModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SMART_CONTRACT_ADDRESS: Joi.string().required(),
        RPC_URL: Joi.string().uri().required(),
        WALLET_PRIVATE_KEY: Joi.string().required(),
        ABI_PATH: Joi.string().required(),
        PORT: Joi.number().port().default(3000),
      }),
    }),
    BlockchainModule,
  ],
})
export class AppModule {}
