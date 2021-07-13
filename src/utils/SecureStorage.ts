export function encode(arg: unknown): string | undefined {
  if (arg) return btoa(encodeURIComponent(JSON.stringify(arg)));
}

export function decode(arg?: string): any {
  if (arg) return JSON.parse(decodeURIComponent(atob(arg)));
}

export default class SecureStorage {
  public static setItem(key: string, value: any): void {
    const str = encode(value);
    if (str) localStorage.setItem(key, str);
  }

  public static getItem(key: string): any {
    const str = localStorage.getItem(key);
    if (str) return decode(str);
  }
}
