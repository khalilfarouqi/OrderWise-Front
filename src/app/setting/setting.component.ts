import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { City } from '../enum/city.enum';
import { User } from '../models/User';
import { Gender } from '../enum/gender.enum';
import { Role } from '../enum/role.enum';
import { UserType } from '../enum/userType.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {

  userForm!: FormGroup;
  profile: User = {
    username: '',
    id: 0,
    lastCheckIn: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cin: '',
    tel: '',
    image: '',
    city: City.AGOURI_MEKNES,
    gender: Gender.MALE,
    role: Role.ADMIN,
    userType: UserType.ADMIN
  };

  isSidebarOpen = true;
  cities = Object.values(City);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getProfile('khalil.farouqi');
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  getProfile(username: string) {
    this.userService.getProfile(username).subscribe(
      (data) => {
        this.profile = data;
      },
      (error) => {
        console.error('Error fetching profile : ', error);
      }
    );
  }

  submitForm(): void {
    console.log('Form submitted:', this.userForm.value);
    this.userService.updateUserForm(this.userForm.value).subscribe({
      next: (response) => {
        console.log("response  --->  " + response)
        this.userForm.reset();
      },
      error: (error) => {
        console.error('Error  ==>  ', error);
      }
    });
  }

}
