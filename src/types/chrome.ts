// Chrome API types
declare global {
  const chrome: {
    runtime: {
      getURL(path: string): string;
    };
    storage: {
      sync: {
        get<T = unknown>(keys: string[]): Promise<T>;
        set(items: Record<string, unknown>): Promise<void>;
      };
    };
  };
}

export {}; 