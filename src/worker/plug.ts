import { Mockplug } from "./mockplug";
import { Wyzeplug } from "./wyzeplug";

export class Plug {
  bot: any;

  constructor(options: IDevice) {
    if (options.id === "mock") {
      this.bot = new Mockplug();
    } else {
      this.bot = new Wyzeplug(options);
    }
  }

  public async off(): Promise<any> {
    return this.bot.off();
  }

  public async on(): Promise<any> {
    return this.bot.on();
  }
}