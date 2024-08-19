import { Component, OnInit } from '@angular/core';
import { ConfigApp } from '../models/configApp';
import { ConfigAppService } from '../service/config-app.service';

@Component({
  selector: 'app-contact-bar',
  templateUrl: './contact-bar.component.html',
  styleUrl: './contact-bar.component.css'
})
export class ContactBarComponent implements OnInit {
  
  configApp: ConfigApp = {
    id: 0,
    email: '',
    tel: '',
    address: '',
    facebookUrl: '',
    instagramUrl: '',
    whatsappUrl: '',
    twitterUrl: '',
    linkedInUrl: '',
    youtubeUrl: '',

    avgDelivered: '',
    avgConfirmation: ''
  };

  constructor(private configAppService: ConfigAppService) {}

  ngOnInit(): void {
    this.getConfigApp();
  }

  getConfigApp() {
    this.configAppService.getConfigAppUrl().subscribe(
      (data) => {
        this.configApp = data;
      },
      (error) => {
        console.error('Error fetching config app : ', error);
      }
    );
  }

}
