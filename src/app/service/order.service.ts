import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { Observable } from 'rxjs';
import { DashboardBean } from '../models/DashboardBean';
import { ConfirmationDashboardStatsBean } from '../models/ConfirmationDashboardStatsBean';
import { ConfirmedTreatedBean } from '../models/ConfirmedTreatedBean';
import { DeliveryBoyDashStatsBean } from '../models/DeliveryBoyDashStatsBean';
import { TruckingStepBean } from '../models/TruckingStepBean';

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

  getOrderByUsernameUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seller/${username}`);
  }

  getConfirmedDashStateUrl(username: string): Observable<ConfirmationDashboardStatsBean> {
    return this.http.get<ConfirmationDashboardStatsBean>(`${this.apiUrl}/confirmation-dashboard-state/${username}`);
  }

  getDashStateUrl(username: string): Observable<DashboardBean> {
    return this.http.get<DashboardBean>(`${this.apiUrl}/dashboard-state/${username}`);
  }

  getDashAllStateUrl(): Observable<DashboardBean> {
    return this.http.get<DashboardBean>(`${this.apiUrl}/dashboard-state`);
  }

  getOrdersConfirmUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/confirm/${username}`);
  }

  getOrdersConfirmByConfirmedUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-confirmed/${username}`);//
  }

  getOrdersDeliverUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/deliver/${username}`);
  }

  getOrdersToDeliveryUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/order-to-deliver/${username}`);
  }

  getOrdersToConfirmationUrl(stage: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-stage/${stage}`);
  }

  getOrdersByStageUrl(stage: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-stage/${stage}`);
  }

  getOrdersReturnUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/return/${username}`);
  }

  getOrderAssignmentsBySellerUsernameUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlAssignment}/seller/${username}`);
  }

  getConfirmedTreatedUrl(username: string): Observable<ConfirmedTreatedBean[]> {
    return this.http.get<ConfirmedTreatedBean[]>(`${this.apiUrl}/confirmed-treated/${username}`);
  }

  getDeliveryBoyDashStateUrl(username: string): Observable<DeliveryBoyDashStatsBean> {
    return this.http.get<DeliveryBoyDashStatsBean>(`${this.apiUrl}/delivery-boy-dashboard-state/${username}`);
  }

  getOrdersReturnedByDeliveryBoyUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/returned-by-delivery-boy/${username}`);//
  }

  getOrdersDeliveredByDeliveryBoyUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/delivered-by-delivery-boy/${username}`);//
  }

  getDeliveryBoyTreatedUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/delivery-boy-treated/${username}`);//
  }

  getOrderByTruckingCodeUrl(truckingCode: number): Observable<TruckingStepBean> {
    return this.http.get<TruckingStepBean>(`${this.apiUrl}/trucking-order/${truckingCode}`);
  }

  treatOrderUrl(id: number, status: string, treatBy: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/treat-order/${id}/${status}/${treatBy}`, {}, { headers, responseType: 'text' });
  }
}
