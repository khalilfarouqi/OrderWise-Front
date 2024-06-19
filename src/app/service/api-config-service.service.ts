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

  getContactUsUrl(): string {
    return `${this.baseUrl}/contactus`;
  }

  getUserUrl(): string {
    return `${this.baseUrl}/user`;
  }

  getOrderUrl(): string {
    return `${this.baseUrl}/order`;
  }

  getOrderAssignmentUrl(): string {
    return `${this.baseUrl}/order-assignment`;
  }

  getProductUrl(): string {
    return `${this.baseUrl}/product`;
  }

  getStockUrl(): string {
    return `${this.baseUrl}/stock`;
  }

  getNotificationUrl(): string {
    return `${this.baseUrl}/notification`;
  }

  getWalletUrl(): string {
    return `${this.baseUrl}/wallet`;
  }

  getMyMoneyUrl(): string {
    return `${this.baseUrl}/mymoney`;
  }
}
