import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { 
    this.apiUrl = this.apiConfig.getContactUsUrl();
  }

  getContactUsUrl(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  postContactUsForm(contactForm: FormGroup): Observable<any> {
    return this.http.post(this.apiUrl, contactForm);
  }
}
