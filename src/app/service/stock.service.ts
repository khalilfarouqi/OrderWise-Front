import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Stock } from '../models/Stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getStockUrl(); 
  }

  getStockUrl(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getAll');
  }

  getStocksByUsernameUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seller/${username}`);
  }

  putStockForm(stockForm: FormGroup): Observable<any> {
    return this.http.put(this.apiUrl, stockForm);
  }
}
