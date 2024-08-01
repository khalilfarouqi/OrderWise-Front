import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../models/User';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  profiles: User[] = [];
  isSidebarOpen = true;

  selectedProfile: any = null;

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

  openModal(profile: User): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '600px',
      data: { profile }
    });
    
    dialogRef.afterClosed().subscribe(result => {
    });
    this.ngOnInit();
  }

  updateProfile(updatedProfile: User) {
    const index = this.profiles.findIndex(profile => profile.id === updatedProfile.id);
    if (index !== -1) {
      this.profiles[index] = updatedProfile;
      // Here, you can call a service method to save the updated profile to the backend if needed
      this.userService.updateUserPopupForm(updatedProfile).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          this.showAlert('Profile updated successfully', response, 'success');
        },
        error => {
          console.error('Error updating profile', error);
          this.showAlert('Error updating profile', error, 'error');
        }
      );
    }
  }

  refuse(updatedProfile: User) {
    const index = this.profiles.findIndex(profile => profile.id === updatedProfile.id);
    if (index !== -1) {
      this.profiles[index] = updatedProfile;
      // Here, you can call a service method to save the updated profile to the backend if needed
      this.userService.refuseUrl(updatedProfile).subscribe(
        response => {
          console.log('Profile refuse successfully', response);
          this.showAlert('Profile refuse successfully', response, 'success');
        },
        error => {
          console.error('Error refuse profile', error);
          this.showAlert('Error refuse profile', error.error.message, 'error');
        }
      );
    }
  }

  valide(updatedProfile: User) {
    const index = this.profiles.findIndex(profile => profile.id === updatedProfile.id);
    if (index !== -1) {
      this.profiles[index] = updatedProfile;
      // Here, you can call a service method to save the updated profile to the backend if needed
      this.userService.valideUrl(updatedProfile).subscribe(
        response => {
          this.showAlert('Profile is valide successfully', response, 'success');
        },
        error => {
          this.showAlert('Error in valide profile', error.error.message, 'error');
        }
      );
    }
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
