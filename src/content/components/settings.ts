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

  cleanupSettings(): void {
    if (globalThis.location.pathname !== '/settings') return;

    const settingsContent = document.querySelector('#subnect-plus-settings-content');
    const settingsMenu = DOMUtils.findSettingsMenu();
    
    if (settingsContent) {
      const container = DOMUtils.findSettingsContainer();
      if (container && settingsMenu) {
        container.replaceChildren(settingsMenu);
      }
    }
  }

  private showSettings(): void {
    const container = DOMUtils.findSettingsContainer();
    const settingsMenu = DOMUtils.findSettingsMenu();
    if (!container || !settingsMenu) return;

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
    backButton?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      container.replaceChildren(settingsMenu);
    });

    container.replaceChildren(settingsContent);
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