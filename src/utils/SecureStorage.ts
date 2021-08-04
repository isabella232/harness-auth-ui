export function encode(arg: unknown): string | undefined {
  if (typeof arg != "undefined")
    return btoa(encodeURIComponent(JSON.stringify(arg)));
}

export function decode(arg: string): unknown {
  return JSON.parse(decodeURIComponent(atob(arg)));
}

export default class SecureStorage {
  public static setItem(key: string, value: unknown): void {
    const str = encode(value);
    if (str) localStorage.setItem(key, str);
  }

  public static getItem(key: string): unknown {
    const str = localStorage.getItem(key);
    if (str) return decode(str);
  }

  public static clear(): void {
    localStorage.clear();
  }
}
