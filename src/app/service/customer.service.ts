import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getCustomerUrl(); 
  }
  
  getCustomerUrl(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getAll');
  }
}
