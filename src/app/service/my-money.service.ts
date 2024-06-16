import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyMoney } from '../models/MyMoney';

@Injectable({
  providedIn: 'root'
})
export class MyMoneyService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { 
    this.apiUrl = this.apiConfig.getMyMoneyUrl();
  }

  postForm(form: FormGroup): Observable<any> {
    return this.http.post(this.apiUrl, form);
  }

  postMyMoney(data: MyMoney): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
