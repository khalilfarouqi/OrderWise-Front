import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../service/order.service';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  period: string = 'monthly';
  isSidebarOpen = true;

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.getStatic();
  }

  getStatic(){

  }

  setPeriod(period: string) {
    this.period = period;
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
