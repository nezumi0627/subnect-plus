import { AUTHOR, GITHUB_URL, VERSION } from '../../constants/config.ts';
import { StorageService } from '../services/storage.ts';
import { DOMUtils } from '../utils/dom.ts';
import { LogoComponent } from './logo.ts';
import { DiscordService } from '../services/discord.ts';

export class SettingsComponent {
  private static instance: SettingsComponent;
  private settingsLinkAdded = false;

  private constructor() {}

  static getInstance(): SettingsComponent {
    if (!SettingsComponent.instance) {
      SettingsComponent.instance = new SettingsComponent();
    }
    return SettingsComponent.instance;
  }

  addSettingsLink(): void {
    const settingsMenu = DOMUtils.findSettingsMenu();
    if (!settingsMenu || document.querySelector('#subnect-plus-settings')) return;

    const plusSettings = document.createElement('a');
    plusSettings.id = 'subnect-plus-settings';
    plusSettings.className = 'h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]';
    plusSettings.href = '#';
    plusSettings.innerHTML = `
      <div class="flex items-center">
        <div class="w-[25px] h-[25px] mr-[5px]">
          <img src="${chrome.runtime.getURL('icons/icon.svg')}" 
               class="text-[var(--font-color)]" 
               alt="Subnect+" />
        </div>
        <span>Subnect+</span>
      </div>
      <svg class="w-[25px] h-[25px] m-[12.5px]" viewBox="0 0 24 24">
        <path fill="currentColor" d="m19.704 12-8.492-8.727a.75.75 0 1 1 1.075-1.046l9 9.25a.75.75 0 0 1 0 1.046l-9 9.25a.75.75 0 1 1-1.075-1.046L19.705 12Z"></path>
      </svg>
    `;

    plusSettings.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this.showSettings();
    });

    settingsMenu.appendChild(plusSettings);
    this.settingsLinkAdded = true;
  }

  /**
   * 設定画面をクリーンアップします
   */
  cleanupSettings(): void {
    try {
      // 設定画面を削除
      const settingsContent = document.querySelector('#subnect-plus-settings-content');
      if (settingsContent) {
        settingsContent.remove();
      }

      // Subnectメニューを再表示
      const settingsMenu = DOMUtils.findSettingsMenu();
      if (settingsMenu) {
        settingsMenu.style.display = '';
      }

      this.setSettingsLinkAdded(false);
    } catch (error) {
      console.error('[Subnect+] Error cleaning up settings:', error);
    }
  }

  private showSettings(): void {
    const container = DOMUtils.findSettingsContainer();
    const settingsMenu = DOMUtils.findSettingsMenu();
    if (!container || !settingsMenu) return;

    // 既存のSubnectメニューを非表示
    settingsMenu.style.display = 'none';

    // 既存の設定画面があれば削除
    const existingContent = document.querySelector('#subnect-plus-settings-content');
    if (existingContent) {
      existingContent.remove();
    }

    const settingsContent = document.createElement('div');
    settingsContent.id = 'subnect-plus-settings-content';
    settingsContent.className = 'max-w-[750px] relative flex flex-col grow';
    settingsContent.innerHTML = `
      <header class="h-[50px] p-[5px] top-0 sticky flex bg-[var(--back-color)] border-b border-[var(--border-color)] z-20">
        <button class="w-[40px] h-[40px] flex" id="subnect-plus-back">
          <svg class="w-[25px] h-[25px] m-[7.5px]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"/>
          </svg>
        </button>
        <div class="p-[5px] my-auto font-bold line-clamp-1">Subnect+ 設定</div>
      </header>
      <div class="p-[5px] flex flex-col">
        <div class="h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]">
          <div class="flex items-center">Change Logo Subnect+</div>
          <div class="flex items-center">
            <input type="checkbox" class="toggle" id="changeLogo">
          </div>
        </div>
        <div class="h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]">
          <div class="flex items-center">Discord通知</div>
          <div class="flex items-center">
            <input type="checkbox" class="toggle" id="enableDiscordNotification">
          </div>
        </div>
        <div class="h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]">
          <div class="flex items-center">Discord Webhook URL</div>
          <div class="flex items-center gap-2">
            <input type="text" class="input" id="discordWebhookUrl" placeholder="https://discord.com/api/webhooks/...">
            <button class="button" id="checkWebhookUrl">確認</button>
          </div>
        </div>
        <div class="h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]">
          <div class="flex items-center">Discord通知テスト</div>
          <div class="flex items-center">
            <button class="button" id="testDiscordWebhook">テスト送信</button>
          </div>
        </div>
        <div class="h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]">
          <div class="flex items-center">アイコンURL確認</div>
          <div class="flex items-center">
            <button class="button" id="checkIconUrl">確認</button>
          </div>
        </div>
        <div class="h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]">
          <div class="flex items-center">バージョン</div>
          <div class="flex items-center opacity-70">${VERSION}</div>
        </div>
        <div class="h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]">
          <div class="flex items-center">作者</div>
          <div class="flex items-center opacity-70">${AUTHOR}</div>
        </div>
        <a href="${GITHUB_URL}" target="_blank" class="h-[60px] p-[5px] flex justify-between rounded-[5px] hover:bg-[var(--border-color)]">
          <div class="flex items-center">GitHub</div>
          <svg class="w-[25px] h-[25px] m-[12.5px]" viewBox="0 0 24 24">
            <path fill="currentColor" d="m19.704 12-8.492-8.727a.75.75 0 1 1 1.075-1.046l9 9.25a.75.75 0 0 1 0 1.046l-9 9.25a.75.75 0 1 1-1.075-1.046L19.705 12Z"></path>
          </svg>
        </a>
      </div>
    `;

    const backButton = settingsContent.querySelector('#subnect-plus-back');
    if (backButton) {
      const handleBack = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        backButton.removeEventListener('click', handleBack);
        this.cleanupSettings();
      };
      backButton.addEventListener('click', handleBack);
    }

    // グローバルクリックイベントリスナーを設定
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('#subnect-plus-settings-content') &&
        !target.closest('#subnect-plus-settings') &&
        (target.closest('a') || target.closest('button'))
      ) {
        document.removeEventListener('click', handleGlobalClick);
        this.cleanupSettings();
      }
    };

    // コンテンツを追加
    container.appendChild(settingsContent);
    document.addEventListener('click', handleGlobalClick);
    this.loadSettings();
  }

  private getUserId(): string | null {
    try {
      // プロフィールボタンの中のユーザー名を取得
      const profileElements = document.querySelectorAll('.line-clamp-1');
      for (const element of profileElements) {
        if (element.textContent?.includes('@')) {
          const match = element.textContent.match(/@([^@\s]+)/);
          if (match) {
            return match[1];
          }
        }
      }

      // 上記で取得できない場合、URLから取得を試みる
      const match = location.pathname.match(/\/@([^/?]+)/);
      if (match) {
        return match[1];
      }

      return null;
    } catch (error) {
      console.error('[Subnect+] Error getting user ID:', error);
      return null;
    }
  }

  private async loadSettings(): Promise<void> {
    const settings = await StorageService.getSettings();

    // Change Logo設定
    const changeLogo = document.getElementById('changeLogo') as HTMLInputElement;
    if (changeLogo) {
      changeLogo.checked = settings.changeLogo || false;
      changeLogo.addEventListener('change', async (e: Event) => {
        const target = e.target as HTMLInputElement;
        await StorageService.setSettings({ ...settings, changeLogo: target.checked });
        LogoComponent.getInstance().changeLogo(target.checked);
      });
    }

    // Discord通知設定
    const enableDiscordNotification = document.getElementById('enableDiscordNotification') as HTMLInputElement;
    if (enableDiscordNotification) {
      enableDiscordNotification.checked = settings.enableDiscordNotification || false;
      enableDiscordNotification.addEventListener('change', async (e: Event) => {
        const target = e.target as HTMLInputElement;
        await StorageService.setSettings({ ...settings, enableDiscordNotification: target.checked });
      });
    }

    // Discord Webhook URL設定
    const discordWebhookUrl = document.getElementById('discordWebhookUrl') as HTMLInputElement;
    if (discordWebhookUrl) {
      discordWebhookUrl.value = settings.discordWebhookUrl || '';
      discordWebhookUrl.addEventListener('change', async (e: Event) => {
        const target = e.target as HTMLInputElement;
        await StorageService.setSettings({ ...settings, discordWebhookUrl: target.value });
        DiscordService.getInstance().setWebhookUrl(target.value);
      });
    }

    // Discord Webhook URL確認ボタン
    const checkWebhookUrl = document.getElementById('checkWebhookUrl');
    if (checkWebhookUrl) {
      checkWebhookUrl.addEventListener('click', async () => {
        const currentSettings = await StorageService.getSettings();
        const webhookUrl = currentSettings.discordWebhookUrl;

        if (!webhookUrl) {
          alert('Discord Webhook URLが設定されていません。');
          return;
        }

        if (!webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
          alert('Discord Webhook URLの形式が正しくありません。');
          return;
        }

        try {
          const response = await fetch(webhookUrl);
          const data = await response.json();

          if (response.ok && data.type === 1) {
            alert('Discord Webhook URLの確認に成功しました。');
          } else {
            alert('Discord Webhook URLが無効です。');
          }
        } catch (error) {
          console.error('[Subnect+] Error checking webhook URL:', error);
          alert('Discord Webhook URLの確認に失敗しました。');
        }
      });
    }

    // テスト送信ボタン
    const testDiscordWebhook = document.getElementById('testDiscordWebhook');
    if (testDiscordWebhook) {
      testDiscordWebhook.addEventListener('click', async () => {
        const currentSettings = await StorageService.getSettings();
        if (!currentSettings.enableDiscordNotification) {
          alert('Discord通知が無効になっています。');
          return;
        }
        if (!currentSettings.discordWebhookUrl) {
          alert('Discord Webhook URLが設定されていません。');
          return;
        }

        const userId = this.getUserId();
        const discord = DiscordService.getInstance();
        discord.setWebhookUrl(currentSettings.discordWebhookUrl);

        if (userId) {
          await discord.setUserId(userId);
        } else {
          alert('ユーザーIDが取得できません。\nユーザープロフィールページで試してください。');
          return;
        }

        const success = await discord.sendMessage({
          content: [
            '**テスト通知**',
            'これはSubnect+からのテスト通知です。',
            '🔗 https://subnect.com',
          ].join('\n'),
          username: 'Subnect+',
        });

        if (success) {
          alert('テスト通知を送信しました。');
        } else {
          alert('テスト通知の送信に失敗しました。');
        }
      });
    }

    // アイコンURL確認ボタン
    const checkIconUrl = document.getElementById('checkIconUrl');
    if (checkIconUrl) {
      checkIconUrl.addEventListener('click', async () => {
        const userId = this.getUserId();
        const discord = DiscordService.getInstance();

        if (userId) {
          await discord.setUserId(userId);
          const iconUrl = discord.getIconUrl();
          alert(`アイコンURL: ${iconUrl}`);
        } else {
          alert('ユーザーIDが取得できません。\nユーザープロフィールページで試してください。');
        }
      });
    }
  }

  isSettingsLinkAdded(): boolean {
    return this.settingsLinkAdded;
  }

  setSettingsLinkAdded(value: boolean): void {
    this.settingsLinkAdded = value;
  }
}
