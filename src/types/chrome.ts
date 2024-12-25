// Chrome API types
declare namespace chrome {
  export const runtime: {
    getURL(path: string): string;
  };

  export const storage: {
    sync: {
      get(keys: string[]): Promise<Record<string, unknown>>;
      set(items: Record<string, unknown>): Promise<void>;
    };
  };
}

export {}; 