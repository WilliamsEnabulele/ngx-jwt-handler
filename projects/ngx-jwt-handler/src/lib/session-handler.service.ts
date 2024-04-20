import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionHandlerService {

  constructor() { }

  /**
 * Adds a key-value pair to the session storage.
 * @param key The key under which to store the value.
 * @param value The value to be stored. It can be of any type.
 * @returns void
 * @example
 * // Storing user information in session storage
 * const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
 * add('user', user);
 */
  add(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
 * Removes a key-value pair from the session storage.
 * @param key The key of the item to be removed.
 * @returns void
 * @example
 * // Removing user information from session storage
 * remove('user');
 */
  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
 * Retrieves the value associated with the specified key from the session storage.
 * @param key The key of the item to retrieve.
 * @returns The value associated with the key, or null if the key is not found.
 * @example
 * // Retrieving user information from session storage
 * const user = get('user');
 * console.log(user);
 */
  get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
 * Checks if a key exists in the session storage.
 * @param key The key to check for existence.
 * @returns true if the key exists, otherwise false.
 * @example
 * // Checking if user information exists in session storage
 * const hasUser = has('user');
 * console.log(hasUser); // true or false
 */
  has(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }

  /**
 * Clears all key-value pairs from the session storage.
 * @returns void
 * @example
 * // Clearing all session storage data
 * clear();
 */
  clear(): void {
    sessionStorage.clear();
  }
}
