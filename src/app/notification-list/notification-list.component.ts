import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
  notifications: any[] = [];
  isSidebarOpen = true;

  constructor(private notificationService: NotificationService) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  ngOnInit(): void {
    this.getNotification();
  }
  
  removeNotification(index: number): void {
    this.notifications.splice(index, 1);
  }

  getNotification() {
    this.notificationService.getNotificationUrl().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

}
