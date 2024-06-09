import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {
  prodile: any[] = [];
  isSidebarOpen = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //this.getProfile('khalil.farouqi');
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  getProfile(username: string) {
    this.userService.getProfile(username).subscribe(
      (data) => {
        console.log(data);
        this.prodile = data;
      },
      (error) => {
        console.error('Error fetching prodile : ', error);
      }
    );
  }

}
