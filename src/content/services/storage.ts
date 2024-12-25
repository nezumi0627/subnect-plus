import { Settings } from '../../types/settings.ts';
import { STORAGE_KEYS } from '../../constants/config.ts';

export class StorageService {
  static async getSettings(): Promise<Settings> {
    const result = await chrome.storage.sync.get([STORAGE_KEYS.CHANGE_LOGO]);
    return result as unknown as Settings;
  }

  static async setLogoEnabled(enabled: boolean): Promise<void> {
    await chrome.storage.sync.set({ [STORAGE_KEYS.CHANGE_LOGO]: enabled });
  }
} 