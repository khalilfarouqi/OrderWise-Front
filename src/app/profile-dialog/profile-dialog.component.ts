import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from '../enum/city.enum';
import { Gender } from '../enum/gender.enum';
import { User } from '../models/User';
import { UserType } from '../enum/userType.enum';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { Role } from '../enum/role.enum';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css'
})
export class ProfileDialogComponent {
  profile: User;

  cities: { key: string, value: string }[] = [];
  genders: { key: string, value: string }[] = []; 

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profile = { ...data.profile };
    this.cities = Object.entries(City).map(([key, value]) => ({ key, value }));
    this.genders = Object.entries(Gender).map(([key, value]) => ({ key, value }));
  }

  onTreatUser(response: string): void {
    this.profile.role = Role.CLIENT;
    if (response == 'validee') {
      this.profile.userType = UserType.SELLER;
      this.profile.confirmedBy = this.authService.getFullname();
    } else if (response == 'refusee') {
      this.profile.userType = UserType.REFUSER;
    }
    this.treatUser(this.profile, response);
    this.dialogRef.close();
  }

  treatUser(profile: User, response: string): void {
    this.userService.treatNewProfiles(profile, response).subscribe(
      res => {
        this.showAlert('Profil is treat success', '', 'success');
      },
      err => {
        this.showAlert('Profil was not treat success', '', 'error');
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
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
