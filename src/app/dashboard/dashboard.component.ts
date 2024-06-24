import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../service/order.service';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { DashboardBean } from '../models/DashboardBean';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  period: string = 'monthly';
  isSidebarOpen = true;

  updatedTimeOrdersToConfirm!: string;
  updatedTimeOrdersToDeliver!: string;
  updatedTimeOrdersToReturn!: string;

  dashState: DashboardBean = {
    totalSales: 0,
    currentMonthOrderCount: 0,
    currentDayOrderCount: 0,
    ordersRejectedInConfirmation: 0,
    ordersRejectedInDelivery: 0,
    ordersInProgress: 0,
    ordersNotTreated: 0,
    ordersReturned: 0,
    ordersValidated: 0,
    ordersToConfirm: 0,
    dateOrdersToConfirm: 0,
    ordersToDeliver: 0,
    dateOrdersToDeliver: 0,
    ordersToReturn: 0,
    dateOrdersToReturn: 0
  };
  OrdersReturns: any[] = [];
  OrdersDelivers: any[] = [];
  OrdersConfirms: any[] = [];
  OrderAssignments: any[] = [];

  constructor(private orderService :OrderService) { }

  ngOnInit(): void {
    this.getStatic('khalil.farouqi');
    this.getOrdersReturn('khalil.farouqi');
    this.getOrdersDeliver('khalil.farouqi');
    this.getOrdersConfirm('khalil.farouqi');
    this.getOrderAssignmentsBySellerUsername('khalil.farouqi');
    this.updateTimeDisplay();
  }

  getStatic(username: string){
    this.orderService.getDashStateUrl(username).subscribe(
      (data) => {
        this.dashState = data;
      },
      (error) => {
        console.error('Error fetching DashState : ', error);
      }
    );
  }

  getOrdersReturn(username: string){
    this.orderService.getOrdersReturnUrl(username).subscribe(
      (data) => {
        this.OrdersReturns = data;
      },
      (error) => {
        console.error('Error fetching Orders Return : ', error);
      }
    );
  }

  getOrdersDeliver(username: string){
    this.orderService.getOrdersDeliverUrl(username).subscribe(
      (data) => {
        this.OrdersDelivers = data;
      },
      (error) => {
        console.error('Error fetching Orders Deliver : ', error);
      }
    );
  }

  getOrdersConfirm(username: string){
    this.orderService.getOrdersConfirmUrl(username).subscribe(
      (data) => {
        this.OrdersConfirms = data;
      },
      (error) => {
        console.error('Error fetching Orders Confirm : ', error);
      }
    );
  }

  getOrderAssignmentsBySellerUsername(username: string){
    this.orderService.getOrderAssignmentsBySellerUsernameUrl(username).subscribe(
      (data) => {
        this.OrderAssignments = data;
      },
      (error) => {
        console.error('Error fetching Order Assignments : ', error);
      }
    );
  }

  setPeriod(period: string) {
    this.period = period;
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  updateTimeDisplay() {
    const millisecondsOrdersToConfirm = this.dashState.dateOrdersToConfirm;
    const millisecondsOrdersToDeliver = this.dashState.dateOrdersToDeliver;
    const millisecondsOrdersToReturn = this.dashState.dateOrdersToReturn;

    this.updatedTimeOrdersToConfirm = this.formatTime(millisecondsOrdersToConfirm);
    this.updatedTimeOrdersToDeliver = this.formatTime(millisecondsOrdersToDeliver);
    this.updatedTimeOrdersToReturn = this.formatTime(millisecondsOrdersToReturn);
  }

  formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) {
        return `${seconds} seconds ago`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hours ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }
}
