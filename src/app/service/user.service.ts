import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { 
    this.apiUrl = this.apiConfig.getUserUrl();
  }

  getFUrl(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

  getProfile(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/${username}`);
  }

  postUserForm(userForm: FormGroup): Observable<any> {
    return this.http.post(this.apiUrl, userForm);
  }
}
