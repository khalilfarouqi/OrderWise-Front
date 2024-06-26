import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getDestinationsUrl(); 
  }

  getDestinationsUrl(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getAll');
  }
}
