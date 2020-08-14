import { Injectable } from '@nestjs/common';
import { Get } from '@nestcloud/http';
import { Loadbalanced } from '@nestcloud/loadbalance';

@Injectable()
@Loadbalanced('nestcloud-example-service')
export class AppClient {
  @Get('/hello')
  async getHello(): Promise<any> {
  }
}
