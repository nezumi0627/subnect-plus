export class DiscordService {
  private static instance: DiscordService;
  private webhookUrl: string | null = null;
  private iconUrl: string | null = null;
  private userId: string | null = null;
  private static readonly DEFAULT_ICON = 'https://subnect.com/subnect.jpg';

  private constructor() {}

  static getInstance(): DiscordService {
    if (!DiscordService.instance) {
      DiscordService.instance = new DiscordService();
    }
    return DiscordService.instance;
  }

  async setUserId(userId: string): Promise<void> {
    this.userId = userId;
    await this.updateUserIcon();
  }

  private async updateUserIcon(): Promise<void> {
    if (this.userId) {
      try {
        const response = await fetch(`https://subnect.com/@${this.userId}?_rsc=19u5b`, {
          headers: {
            'Accept': 'text/x-component',
            'User-Agent': navigator.userAgent,
          },
        });
        const text = await response.text();

        // OGイメージURLからアイコンを取得
        const ogImageMatch = text.match(/property="og:image" content="([^"]+)"/);
        if (ogImageMatch) {
          const iconUrl = ogImageMatch[1];
          if (iconUrl && !iconUrl.endsWith('subnect.jpg')) {
            this.setIconUrl(iconUrl);
            console.log('[Subnect+] User icon set from OG image:', iconUrl);
            return;
          }
        }

        // アイコンデータの直接取得を試みる
        const iconMatch = text.match(/"icon":\s*{\s*"assetUrl":\s*"([^"]+)"/);
        if (iconMatch) {
          const assetUrl = iconMatch[1];
          if (assetUrl && !assetUrl.endsWith('subnect.jpg')) {
            this.setIconUrl(assetUrl);
            console.log('[Subnect+] User icon set from asset URL:', assetUrl);
            return;
          }
        }

        console.log('[Subnect+] No valid user icon found, using default');
      } catch (error) {
        console.error('[Subnect+] Error fetching profile page:', error);
      }
    } else {
      console.log('[Subnect+] No user ID available, using default icon');
    }
  }

  setWebhookUrl(url: string): void {
    this.webhookUrl = url;
  }

  setIconUrl(assetUrl: string): void {
    if (!assetUrl) return;

    if (assetUrl.startsWith('/')) {
      // アセットURLの形式に基づいて適切なエンドポイントを構築
      if (assetUrl.includes('/api/assets/get/')) {
        this.iconUrl = `https://subnect.com${assetUrl}`;
      } else {
        this.iconUrl = `https://subnect.com/api/assets/get${assetUrl}`;
      }
    } else if (assetUrl.includes('subnect.com')) {
      this.iconUrl = assetUrl;
    } else {
      this.iconUrl = `https://subnect.com${assetUrl}`;
    }

    console.log('[Subnect+] Icon URL set to:', this.iconUrl);
  }

  private getUserIconUrl(): string {
    if (!this.iconUrl) return DiscordService.DEFAULT_ICON;
    return this.iconUrl;
  }

  getIconUrl(): string {
    return this.iconUrl || DiscordService.DEFAULT_ICON;
  }

  async sendMessage(message: {
    content: string;
    username?: string;
  }): Promise<boolean> {
    if (!this.webhookUrl) {
      console.error('[Subnect+] Discord webhook URL is not set');
      return false;
    }

    const iconUrl = this.getUserIconUrl();

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...message,
          content: message.content,
          avatar_url: iconUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Subnect+] Discord API error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('[Subnect+] Failed to send Discord message:', error);
      return false;
    }
  }

  async sendNotification(title: string, message: string, url?: string): Promise<boolean> {
    const content = [
      `**${title}**`,
      message,
      url ? `🔗 ${url}` : '',
    ].filter(Boolean).join('\n');

    return await this.sendMessage({
      content,
      username: 'Subnect+',
    });
  }
}
