import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor() { }

  encrypt(password: string, hash: string): string {
    return crypto.SHA256.encrypt(password, hash);
  }

}
