import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { Observable } from 'rxjs';
import { DashboardBean } from '../models/DashboardBean';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string;
  private apiUrlAssignment: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getOrderUrl(); 
    this.apiUrlAssignment = this.apiConfig.getOrderAssignmentUrl(); 
  }

  getOrderUrl(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getAll');
  }

  getDashStateUrl(username: string): Observable<DashboardBean> {
    return this.http.get<DashboardBean>(`${this.apiUrl}/dashboard-state/${username}`);
  }

  getOrdersConfirmUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/confirm/${username}`);
  }

  getOrdersDeliverUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deliver/${username}`);
  }

  getOrdersReturnUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/return/${username}`);
  }

  getOrderAssignmentsBySellerUsernameUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlAssignment}/seller/${username}`);
  }
}
