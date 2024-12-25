// Chrome API types
declare global {
  const chrome: {
    runtime: {
      getURL(path: string): string;
    };

    storage: {
      sync: {
        get(keys: string[]): Promise<Record<string, unknown>>;
        set(items: Record<string, unknown>): Promise<void>;
      };
    };
  };
}

export {}; 