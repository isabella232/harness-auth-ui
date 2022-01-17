/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

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
