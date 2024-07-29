import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConfigAppService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { 
    this.apiUrl = this.apiConfig.getConfigAppUrl();
  }

  getConfigAppUrl(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  putConfigAppForm(configAppForm: FormGroup): Observable<any> {
    return this.http.put(this.apiUrl, configAppForm);
  }
}
