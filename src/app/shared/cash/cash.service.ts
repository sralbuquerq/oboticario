import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cash } from './../../models/cashback.interface';

@Injectable({
  providedIn: 'root'
})
export class CashService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getCashback(cpf): Observable<{ body: Cash }> {
    return this.http.get<{ body: Cash}>(
      '/credit/v1/cashback?cpf=' + cpf
    );
  }
}
