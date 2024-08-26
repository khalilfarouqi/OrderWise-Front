import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { TeamMemberService } from '../service/team-member.service';
import { UserType } from '../enum/userType.enum';
import { City } from '../enum/city.enum';
import { Gender } from '../enum/gender.enum';
import { TeamMembers } from '../models/TeamMembers';

@Component({
  selector: 'app-team-member-profil',
  templateUrl: './team-member-profil.component.html',
  styleUrls: ['./team-member-profil.component.css']
})
export class TeamMemberProfilComponent {

  teamMember: TeamMembers;
  isEditMode: boolean;

  cities: { key: string, value: string }[] = [];
  genders: { key: string, value: string }[] = [];
  userTypes = [
    { key: 'CONFIRMED', value: UserType.CONFIRMED },
    { key: 'DELIVERY_BOY', value: UserType.DELIVERY_BOY }
  ];

  constructor(
    private userService: UserService,
    private teamMemberService: TeamMemberService,
    public dialogRef: MatDialogRef<TeamMemberProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.teamMember; // Check if teamMember data exists to determine edit mode
    this.teamMember = this.isEditMode ? { ...data.teamMember } : this.initializeNewMember();
    this.cities = Object.entries(City).map(([key, value]) => ({ key, value }));
    this.genders = Object.entries(Gender).map(([key, value]) => ({ key, value }));
  }

  initializeNewMember(): TeamMembers {
    return {
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        cin: '',
        tel: '',
        city: City.NON_RESIDENT,
        gender: Gender.PERSONALIZE,
        image: '',
      },
    };
  }

  onSave(): void {
    this.dialogRef.close(this.teamMember); // Close the dialog and pass the data back to the calling component
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.teamMember.user.image = e.target.result; // Set the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  }
}

