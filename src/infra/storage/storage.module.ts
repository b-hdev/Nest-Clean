import { Uploader } from '@/domain/forum/application/storage/uploader';
import { Module } from '@nestjs/common';
import { SdkStorage } from './sdk-storage';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: SdkStorage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
