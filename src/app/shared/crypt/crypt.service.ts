import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptService {

  constructor() { }

  encrypt(words: string, hash: string): string {
    return crypto.AES.encrypt(words, hash.trim()).toString();
  }

  decrypt(encrypted: string, hash: string): string {
    return crypto.AES.decrypt(encrypted, hash.trim()).toString(crypto.enc.Utf8);
  }

  hash(): string {
    return crypto.SHA1().toString();
    // return '123';
  }

  getHash(encrypted: string): string {
    return encrypted.match(/[^\-]*/gm)[2].replace('"', '');
  }

  getEncrypt(encrypted: string): string {
    return encrypted.match(/[^\-]*/gm)[0].replace('"', '');
  }
}
