export class LogoComponent {
  private static instance: LogoComponent;
  private logoChanged = false;

  private constructor() {
    this.injectStyles();
  }

  static getInstance(): LogoComponent {
    if (!LogoComponent.instance) {
      LogoComponent.instance = new LogoComponent();
    }
    return LogoComponent.instance;
  }

  private injectStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .subnect-plus-logo {
        height: 50px;
        padding: 5px;
        position: sticky;
        top: 0;
        display: flex;
        background-color: var(--back-color);
        border-bottom: 1px solid var(--border-color);
        z-index: 20;
      }

      .subnect-plus-logo-title {
        padding-top: 2.5px;
        margin: auto 0;
        font-size: 24px;
        font-weight: bold;
        color: var(--font-color);
      }

      .subnect-plus-logo-title.plus {
        color: var(--accent-color);
      }

      .subnect-plus-logo-icon {
        height: 20px;
        margin: 10px;
      }

      .subnect-plus-logo-icon.original {
        color: var(--accent-color);
      }
    `;
    document.head.appendChild(style);
  }

  changeLogo(enabled: boolean): void {
    const logoLink = document.querySelector<HTMLAnchorElement>('a[href="/home"]');
    if (!logoLink) return;

    if (enabled) {
      this.logoChanged = true;
      logoLink.className = 'subnect-plus-logo';

      const titleDiv = logoLink.querySelector('div');
      if (titleDiv) {
        titleDiv.textContent = 'Subnect+';
        titleDiv.className = 'subnect-plus-logo-title plus';
      }

      const svg = logoLink.querySelector('svg');
      if (svg) {
        svg.outerHTML = `<img src="${chrome.runtime.getURL('icons/icon.svg')}" 
          class="subnect-plus-logo-icon" 
          alt="Subnect+" />`;
      }
    } else {
      this.logoChanged = false;
      logoLink.className = 'subnect-plus-logo';

      const titleDiv = logoLink.querySelector('div');
      if (titleDiv) {
        titleDiv.textContent = 'Subnect';
        titleDiv.className = 'subnect-plus-logo-title';
      }

      const img = logoLink.querySelector('img');
      if (img) {
        img.outerHTML =
          `<svg class="subnect-plus-logo-icon original" viewBox="0 0 350 400" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 125C0 111.193 11.1929 100 25 100H175V200H25C11.1929 200 0 188.807 0 175V125Z" fill="currentColor"/>
          <path d="M0 325C0 311.193 11.1929 300 25 300H175V375C175 388.807 163.807 400 150 400H25C11.1929 400 0 388.807 0 375V325Z" fill="currentColor"/>
          <path d="M175 200H325C338.807 200 350 211.193 350 225V275C350 288.807 338.807 300 325 300H175V200Z" fill="currentColor"/>
          <path d="M175 25C175 11.1929 186.193 0 200 0H325C338.807 0 350 11.1929 350 25V75C350 88.8071 338.807 100 325 100H175V25Z" fill="currentColor"/>
        </svg>`;
      }
    }
  }

  isLogoChanged(): boolean {
    return this.logoChanged;
  }
}
