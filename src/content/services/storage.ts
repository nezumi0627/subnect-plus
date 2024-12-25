import { Settings } from '../../types/settings.ts';

export class StorageService {
  static async getSettings(): Promise<Settings> {
    const result = await chrome.storage.sync.get(['changeLogo']);
    return {
      changeLogo: result.changeLogo ?? false,
    };
  }

  static async setSettings(settings: Settings): Promise<void> {
    await chrome.storage.sync.set(settings);
  }
} 