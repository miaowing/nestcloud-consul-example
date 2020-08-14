import { Controller, Get } from '@nestjs/common';
import { InjectLoadbalance, Loadbalance } from '@nestcloud/loadbalance';

@Controller('state')
export class StateController {
  constructor(
    @InjectLoadbalance()
    private readonly lb: Loadbalance,
  ) {
  }

  @Get()
  getState() {
    return this.lb.state();
  }
}
