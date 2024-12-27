import { Settings } from '../../types/settings.ts';

export class StorageService {
  static async getSettings(): Promise<Settings> {
    const result = await chrome.storage.sync.get([
      'changeLogo',
      'discordWebhookUrl',
      'enableDiscordNotification',
    ]) as {
      changeLogo?: boolean;
      discordWebhookUrl?: string;
      enableDiscordNotification?: boolean;
    };

    return {
      changeLogo: result.changeLogo ?? false,
      discordWebhookUrl: result.discordWebhookUrl ?? '',
      enableDiscordNotification: result.enableDiscordNotification ?? false,
    };
  }

  static async setSettings(settings: Settings): Promise<void> {
    await chrome.storage.sync.set(settings as unknown as Record<string, unknown>);
  }
}
