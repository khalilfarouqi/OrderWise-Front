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

  getAllUsersToConfirmUrl(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/getAllToConfirm`);
  }

  getProfile(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/${username}`);
  }

  postUserForm(userForm: FormGroup): Observable<any> {
    return this.http.post(this.apiUrl, userForm);
  }

  updateUserForm(userForm: FormGroup): Observable<any> {
    return this.http.put(this.apiUrl, userForm);
  }

  updatePassword(userForm: FormGroup): Observable<any> {
    return this.http.post(this.apiUrl + '/change-password', userForm);
  }
  
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
