import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { Observable } from 'rxjs';
import { Wallet } from '../models/Wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { 
    this.apiUrl = this.apiConfig.getWalletUrl();
  }

  getWallatByUsername(username: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/seller/${username}`);
  }
}
