export class Settings {
  id: number;
  units: string;
  locale: string;
  timezone: string;
  title?: string;
  logo?: Uint8Array;
  refresh: number;
  timeout: number;
  createdat: Date;
  updatedat: Date;
  deleted: boolean;
  deletedat?: Date;

  constructor() {
    this.id = 0;
    this.units = "F";
    this.refresh = 30000;
    this.timeout = 300000;
    this.locale = "us_EN";
    this.timezone = "America/New_York";
    this.createdat = new Date();
    this.updatedat = new Date();
    this.deleted = false;
  }
}

export class SettingsState {
  settings: Settings;
  error: boolean;

  constructor() {
    this.settings = new Settings();
    this.error = false;
  }
}
