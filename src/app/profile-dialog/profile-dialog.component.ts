import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from '../enum/city.enum';
import { Gender } from '../enum/gender.enum';
import { User } from '../models/User';
import { UserType } from '../enum/userType.enum';

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
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profile = { ...data.profile };
    this.cities = Object.entries(City).map(([key, value]) => ({ key, value }));
    this.genders = Object.entries(Gender).map(([key, value]) => ({ key, value }));
  }

  onSave(): void {
    this.dialogRef.close(this.profile);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onValide(): void {
    console.log(this.profile)
    this.profile.userType = UserType.SELLER;
    console.log(this.profile)
    this.dialogRef.close(this.profile);
  }

  onRefuser(): void {
    this.profile.userType = UserType.REFUSER;
    this.dialogRef.close(this.profile);
  }
}
