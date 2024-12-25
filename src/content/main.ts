import '../types/chrome.ts';
import { DOMUtils } from './utils/dom.ts';
import { StorageService } from './services/storage.ts';
import { LogoComponent } from './components/logo.ts';
import { SettingsComponent } from './components/settings.ts';

class SubnectPlus {
  private readonly logo: LogoComponent;
  private readonly settings: SettingsComponent;

  constructor() {
    this.logo = LogoComponent.getInstance();
    this.settings = SettingsComponent.getInstance();
    this.init();
  }

  private async init(): Promise<void> {
    try {
      DOMUtils.injectStyles();
      this.setupEventListeners();
      this.observeDOM();
      await this.loadAndApplySettings();
      this.observeLogoChanges();
    } catch (error) {
      console.error('[Subnect+]', error);
    }
  }

  private setupEventListeners(): void {
    const checkSettingsPage = (): void => {
      if (globalThis.location.pathname === '/settings') {
        this.settings.setSettingsLinkAdded(false);
        this.handleDOMChanges();
      }
      this.settings.cleanupSettings();
    };

    setTimeout(checkSettingsPage, 500);

    globalThis.addEventListener('popstate', () => setTimeout(checkSettingsPage, 100));

    const originalPushState = history.pushState.bind(history);
    history.pushState = function (data: unknown, unused: string, url?: string | URL): void {
      originalPushState(data, unused, url);
      setTimeout(checkSettingsPage, 100);
    };

    const originalReplaceState = history.replaceState.bind(history);
    history.replaceState = function (data: unknown, unused: string, url?: string | URL): void {
      originalReplaceState(data, unused, url);
      setTimeout(checkSettingsPage, 100);
    };

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('#subnect-plus-settings-content') &&
        !target.closest('#subnect-plus-settings')
      ) {
        this.settings.cleanupSettings();
      }
    });
  }

  private async loadAndApplySettings(): Promise<void> {
    const settings = await StorageService.getSettings();
    if (settings.changeLogo) {
      this.logo.changeLogo(true);
    }
  }

  private observeDOM(): void {
    DOMUtils.observeDOM(() => {
      if (!this.settings.isSettingsLinkAdded() && globalThis.location.pathname === '/settings') {
        this.handleDOMChanges();
      }
    });
  }

  private observeLogoChanges(): void {
    DOMUtils.observeDOM(async () => {
      const logoLink = document.querySelector<HTMLAnchorElement>('a[href="/home"]');
      if (logoLink && !this.logo.isLogoChanged()) {
        const settings = await StorageService.getSettings();
        if (settings.changeLogo) {
          this.logo.changeLogo(true);
        }
      }
    });
  }

  private handleDOMChanges(): void {
    const settingsMenu = DOMUtils.findSettingsMenu();
    if (settingsMenu && !document.querySelector('#subnect-plus-settings')) {
      this.settings.addSettingsLink();
    }
  }
}

// Initialize the extension
new SubnectPlus();
