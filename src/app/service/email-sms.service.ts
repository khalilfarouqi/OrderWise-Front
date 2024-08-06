import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailSmsService {
  private apiUrlEmail: string;
  private apiUrlSms: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrlEmail = this.apiConfig.getMailUrl(); 
    this.apiUrlSms = this.apiConfig.getSmsUrl(); 
  }
  
  sendEmail(to: string, subject: string, text: string): Observable<any> {
    const params = new HttpParams()
    .set('to', to)
    .set('subject', subject)
    .set('text', text);
    return this.http.post(`${this.apiUrlEmail}/send`, null, { params, responseType: 'text' as 'json' });
  }

  sendSMS(to: string, text: string): Observable<any> {
    const params = new HttpParams()
    .set('to', to)
    .set('text', text);
    return this.http.post(`${this.apiUrlSms}/send`, null, { params, responseType: 'text' as 'json' });
  }

  sendWhatsapp(to: string, message: string): Observable<any> {
    const params = new HttpParams()
    .set('to', to)
    .set('message', message);
    return this.http.post(`${this.apiUrlSms}/whatsapp`, null, { params, responseType: 'message' as 'json' });
  }
}
