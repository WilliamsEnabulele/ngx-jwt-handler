import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionHandlerService {

  constructor() { }

  add(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  has(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }

  clear(): void {
    sessionStorage.clear();
  }
}
