import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud/boot';
import { ConsulModule } from '@nestcloud/consul';
import { ConfigModule } from '@nestcloud/config';
import { ServiceModule } from '@nestcloud/service';
import { LoadbalanceModule } from '@nestcloud/loadbalance';
import { HttpModule } from '@nestcloud/http';
import { ScheduleModule } from '@nestcloud/schedule';
import { BOOT, LOADBALANCE, components, CONSUL } from '@nestcloud/common';
import { TypeOrmHealthIndicator, TerminusModule } from '@nestjs/terminus';

import * as controllers from './controllers';
import * as clients from './clients';
import { LoggerModule } from '@nestcloud/logger';
import { resolve } from 'path';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ScheduleModule.forRoot(),
    BootModule.forRoot({
      filePath: resolve(__dirname, 'config.yaml'),
    }),
    ConsulModule.forRootAsync({ inject: [BOOT] }),
    ConfigModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
    LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
    HttpModule.forRootAsync({ inject: [LOADBALANCE] }),
    TerminusModule.forRootAsync({
      inject: [TypeOrmHealthIndicator],
      useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
    }),
  ],
  controllers: components(controllers),
  providers: components(clients),
})
export class AppModule {
}
