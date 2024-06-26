import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getNotificationUrl(); 
  }

  getNotificationUrl(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllNotificationNotRead/${username}`);
  }

  readNotification(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post(`${this.apiUrl}/readNotification/${id}`, {}, { headers, responseType: 'text' });
  }
}
