import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/User';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  profiles: User[] = [];
  isSidebarOpen = true;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsersToConfirm();
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  getAllUsersToConfirm() {
    this.userService.getAllUsersToConfirmUrl().subscribe(
      (data) => {
        this.profiles = data;
      },
      (error) => {
        console.error('Error fetching stocks:', error);
      }
    );
  }

  openDialog(profile: User): void {
    this.dialog.open(ProfileDialogComponent, {
      data: profile
    });
  }

}
