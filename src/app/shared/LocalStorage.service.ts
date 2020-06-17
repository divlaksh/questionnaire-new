import { Injectable } from '@angular/core';
// import { UtilService } from './util';

@Injectable()
export class LocalStorageService {
  private interStorage: {
    local: Object;
    session: Object;
  };

  constructor() {
    this.interStorage = {
      local: {},
      session: {}
    };
  }

  public setItem(type: string, key: string, data: any): void {

    const storageType = type.toLowerCase();
    const stringifyData = (key === 'userSetting') ? JSON.stringify(data) : data;

    if (storageType === 'local' && this.isLocalStorage()) {

      localStorage.setItem(key, stringifyData);

    } else if (storageType === 'session' && this.isSessionStorage()) {

      sessionStorage.setItem(key, stringifyData);

    } else {
      this.interStorage[storageType][key] = stringifyData;
    }
  }

  public getItem(type: string, key: string): any {

    let stringifyData;

    const storageType = type.toLowerCase();

    if (storageType === 'local' && this.isLocalStorage()) {

      stringifyData = localStorage.getItem(key);

    } else if (type.toLowerCase() === 'session' && this.isSessionStorage()) {

      stringifyData = sessionStorage.getItem(key);

    } else {

      stringifyData = this.interStorage[storageType][key];
    }

    const parsedData = (this.isEmpty(stringifyData)) ? null : (key === 'userSetting') ? JSON.parse(stringifyData) : stringifyData;

    return parsedData;

  }

  public removeItem(type: string, key: string): void {

    const storageType = type.toLowerCase();

    if (storageType === 'local' && this.isLocalStorage()) {

      localStorage.removeItem(key);

    } else if (type.toLowerCase() === 'session' && this.isSessionStorage()) {

      sessionStorage.removeItem(key);

    } else {

      delete this.interStorage[storageType][key];

    }
  }

  public clear(type: string): void {

    const storageType = type.toLowerCase();

    if (storageType !== 'local' && storageType !== 'session') {
      return void 0;
    }

    if (storageType === 'local' && this.isLocalStorage()) {

      localStorage.clear();

    } else if (storageType === 'session' && this.isSessionStorage()) {

      sessionStorage.clear();

    } else {

      this.interStorage[storageType] = {};

    }
  }

  private isLocalStorage(): boolean {
    const ads = 'ads';
    try {
      localStorage.setItem(ads, ads);
      localStorage.removeItem(ads);
      return true;
    } catch (e) {
      return false;
    }
  }

  private isSessionStorage(): boolean {
    const psi = 'psiucs';
    try {
      sessionStorage.setItem(psi, psi);
      sessionStorage.removeItem(psi);
      return true;
    } catch (e) {
      return false;
    }
  }

  public isCookie(): boolean {
    let cookieEnabled;

    cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
    }
    return cookieEnabled;
  }

  /**
   * Check whether object / array / string is empty or not.
   * @param obj Can be an Object or a Array. For other type it will return false.
   * @returns Boolen
   */
  public isEmpty(obj: any): boolean {

    if (obj === null || obj === undefined || obj === '') {
      return true;
    }

    if (obj instanceof Array) {
      return (obj.length > 0) ? false : true;
    }

    if (typeof obj === 'object') {

      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }

      return JSON.stringify(obj) === JSON.stringify({});
    }

    return false;
  }
}
