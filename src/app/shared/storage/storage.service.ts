import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(id: string): string {
    return localStorage.getItem(id);
  }

  set(id: string, value: any): void {
    localStorage.setItem(id, JSON.stringify(value));
  }

  remove(id: string): void {
    localStorage.removeItem(id);
  }
}
