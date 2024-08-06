import { Component, OnInit } from '@angular/core';
import { EmailSmsService } from '../service/email-sms.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrl: './send-notification.component.css'
})
export class SendNotificationComponent implements OnInit {
  to!: string;
  subject!: string;
  text!: string;
  responseMessage!: string;

  messageType: string = 'email';

  customers: any;

  isSidebarOpen = true;

  constructor(private emailService: EmailSmsService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  sendMessage() {
    console.log("text ==> " + this.text)
    switch (this.messageType) {
      case 'email':
        this.sendEmail();
        break;
      case 'sms':
        this.sendSMS();
        break;
      case 'whatsapp':
        this.sendWhatsapp();
        break;
    }
  }

  sendEmail() {
    this.emailService.sendEmail(this.to, this.subject, this.text)
      .subscribe(response => {
        this.showAlert('Email sent successfully', response.message, 'success');
      }, error => {
        this.showAlert('Error sending email', error.message, 'error');
      }
    );
  }

  sendSMS() {
    this.emailService.sendSMS(this.to, this.text)
      .subscribe(response => {
        this.showAlert('Sms sent successfully', response.message, 'success');
      }, error => {
        this.showAlert('Error sending sms', error.message, 'error');
      }
    );
  }

  sendWhatsapp() {
    this.emailService.sendWhatsapp(this.to, this.text)
      .subscribe(response => {
        this.showAlert('WhatsApp message sent successfully', response.message, 'success');
      }, error => {
        this.showAlert('Error sending WhatsApp message', error.message, 'error');
      }
    );
  }

  getAllCustomer() {
    this.customerService.getCustomerUrl().subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
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
