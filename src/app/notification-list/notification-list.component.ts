import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import Swal from 'sweetalert2';

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
    this.getNotification('khalil.farouqi');
  }
  
  removeNotification(index: number, notificationId: number): void {
    this.notifications.splice(index, 1);
    this.markAsRead(notificationId);
  }

  markAsRead(notificationId: number) {
    this.notificationService.readNotification(notificationId).subscribe(
      response => {
        this.showAlert('Notification marked as read', response.message, 'success');
      },
      error => {
        this.showAlert('Error marking notification as read', error, 'error');
        console.error('Error  ==>  ', error);
      }
    );
  }

  getNotification(username: string) {
    this.notificationService.getNotificationUrl(username).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  showAlert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }

}
