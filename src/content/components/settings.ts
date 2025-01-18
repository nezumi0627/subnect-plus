import { AUTHOR, GITHUB_URL, VERSION } from '../../constants/config.ts';
import { StorageService } from '../services/storage.ts';
import { DOMUtils } from '../utils/dom.ts';
import { LogoComponent } from './logo.ts';

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

  private loadSettings(): void {
    const changeLogo = document.querySelector<HTMLInputElement>('#changeLogo');
    if (changeLogo) {
      StorageService.getInstance().get<boolean>('changeLogo').then((value) => {
        changeLogo.checked = value ?? false;
        changeLogo.addEventListener('change', () => {
          StorageService.getInstance().set('changeLogo', changeLogo.checked);
          LogoComponent.getInstance().changeLogo(changeLogo.checked);
        });
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
