import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private baseUrl = 'http://localhost:8081/v1';

  constructor() { }

  getUsersUrl(): string {
    return `${this.baseUrl}/users`;
  }

  getDestinationsUrl(): string {
    return `${this.baseUrl}/destinations`;
  }
}
