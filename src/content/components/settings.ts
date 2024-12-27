import { AUTHOR, GITHUB_URL, VERSION } from '../../constants/config.ts';
import { StorageService } from '../services/storage.ts';
import { DOMUtils } from '../utils/dom.ts';
import { LogoComponent } from './logo.ts';

export class SettingsComponent {
  private static instance: SettingsComponent;
  private settingsLinkAdded = false;

  private constructor() {
    this.injectStyles();
  }

  static getInstance(): SettingsComponent {
    if (!SettingsComponent.instance) {
      SettingsComponent.instance = new SettingsComponent();
    }
    return SettingsComponent.instance;
  }

  private injectStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .subnect-plus-settings-link {
        height: 60px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
      }

      .subnect-plus-settings-link:hover {
        background-color: var(--hover-color);
      }

      .subnect-plus-settings-icon-container {
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }

      .subnect-plus-settings-icon {
        width: 100%;
        height: 100%;
      }

      .subnect-plus-settings-arrow {
        width: 25px;
        height: 25px;
        margin: 12.5px;
      }

      .subnect-plus-settings-content {
        max-width: 750px;
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }

      .subnect-plus-settings-header {
        height: 50px;
        padding: 5px;
        position: sticky;
        top: 0;
        display: flex;
        background-color: var(--back-color);
        border-bottom: 1px solid var(--border-color);
        z-index: 20;
      }

      .subnect-plus-back-button {
        width: 40px;
        height: 40px;
        display: flex;
      }

      .subnect-plus-back-icon {
        width: 25px;
        height: 25px;
        margin: 7.5px;
      }

      .subnect-plus-settings-title {
        padding: 5px;
        margin: auto 0;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .subnect-plus-settings-body {
        padding: 5px;
        display: flex;
        flex-direction: column;
      }

      .subnect-plus-settings-item {
        height: 60px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
      }

      .subnect-plus-settings-item:hover {
        background-color: var(--hover-color);
      }

      .subnect-plus-settings-label {
        display: flex;
        align-items: center;
      }

      .subnect-plus-settings-value {
        display: flex;
        align-items: center;
        opacity: 0.7;
      }
    `;
    document.head.appendChild(style);
  }

  addSettingsLink(): void {
    const settingsMenu = DOMUtils.findSettingsMenu();
    if (!settingsMenu || document.querySelector('#subnect-plus-settings')) return;

    const plusSettings = document.createElement('a');
    plusSettings.id = 'subnect-plus-settings';
    plusSettings.className = 'subnect-plus-settings-link';
    plusSettings.href = '#';
    plusSettings.innerHTML = `
      <div class="subnect-plus-settings-label">
        <div class="subnect-plus-settings-icon-container">
          <img src="${chrome.runtime.getURL('icons/icon.svg')}" 
               class="subnect-plus-settings-icon" 
               alt="Subnect+" />
        </div>
        <span>Subnect+</span>
      </div>
      <svg class="subnect-plus-settings-arrow" viewBox="0 0 24 24">
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

  cleanupSettings(): void {
    try {
      const settingsContent = document.querySelector('#subnect-plus-settings-content');
      if (settingsContent) {
        settingsContent.remove();
      }

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

    settingsMenu.style.display = 'none';

    const existingContent = document.querySelector('#subnect-plus-settings-content');
    if (existingContent) {
      existingContent.remove();
    }

    const settingsContent = document.createElement('div');
    settingsContent.id = 'subnect-plus-settings-content';
    settingsContent.className = 'subnect-plus-settings-content';
    settingsContent.innerHTML = `
      <header class="subnect-plus-settings-header">
        <button class="subnect-plus-back-button" id="subnect-plus-back">
          <svg class="subnect-plus-back-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"/>
          </svg>
        </button>
        <div class="subnect-plus-settings-title">Subnect+ 設定</div>
      </header>
      <div class="subnect-plus-settings-body">
        <div class="subnect-plus-settings-item">
          <div class="subnect-plus-settings-label">Change Logo Subnect+</div>
          <div class="subnect-plus-settings-value">
            <input type="checkbox" class="toggle" id="changeLogo">
          </div>
        </div>
        <div class="subnect-plus-settings-item">
          <div class="subnect-plus-settings-label">バージョン</div>
          <div class="subnect-plus-settings-value">${VERSION}</div>
        </div>
        <div class="subnect-plus-settings-item">
          <div class="subnect-plus-settings-label">作者</div>
          <div class="subnect-plus-settings-value">${AUTHOR}</div>
        </div>
        <a href="${GITHUB_URL}" target="_blank" class="subnect-plus-settings-item">
          <div class="subnect-plus-settings-label">GitHub</div>
          <svg class="subnect-plus-settings-arrow" viewBox="0 0 24 24">
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

    container.appendChild(settingsContent);
    document.addEventListener('click', handleGlobalClick);
    this.loadSettings();
  }

  private async loadSettings(): Promise<void> {
    const settings = await StorageService.getSettings();
    const changeLogo = document.getElementById('changeLogo') as HTMLInputElement;
    if (changeLogo) {
      changeLogo.checked = settings.changeLogo || false;
      changeLogo.addEventListener('change', async (e: Event) => {
        const target = e.target as HTMLInputElement;
        await StorageService.setSettings({ changeLogo: target.checked });
        LogoComponent.getInstance().changeLogo(target.checked);
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
