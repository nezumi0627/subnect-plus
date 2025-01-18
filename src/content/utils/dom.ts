export class DOMUtils {
  static findSettingsMenu(): HTMLElement | null {
    if (globalThis.location.pathname === '/settings') {
      return document.querySelector('main > div.p-\\[5px\\].flex.flex-col');
    }
    return null;
  }

  static findSettingsContainer(): HTMLElement | null {
    if (globalThis.location.pathname === '/settings') {
      return document.querySelector('main.max-w-\\[750px\\].relative.flex.flex-col.grow');
    }
    return null;
  }

  static observeDOM(callback: () => void): void {
    const observer = new MutationObserver(callback);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}
