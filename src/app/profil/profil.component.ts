import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  prodile: any[] = [];
  isSidebarOpen = true;

  constructor(private userService: UserService) { }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

}
