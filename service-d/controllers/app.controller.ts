import { Controller, Get } from '@nestjs/common';
import { AppClient } from '../clients';
import { Hello } from '../interfaces/hello.interface';

@Controller('/hello')
export class AppController {
  constructor(
    private readonly appClient: AppClient,
  ) {
  }

  @Get()
  async getHello() {
    const hello = await this.appClient.getHello() as Hello;
    return { message: hello.message };
  }
}
