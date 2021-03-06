import { Switch } from "./switch";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class Mockplug extends Switch {
  public async off(): Promise<any> {
    return new Promise(resolve => {
      wait(300);
      resolve(true);
    });
  }

  public async on(): Promise<any> {
    return new Promise(resolve => {
      wait(300);
      resolve(true);
    });
  }
}
