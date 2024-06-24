import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required)
    });
  }

  submitForm(): void {
    this.contactForm.value.username = this.contactForm.value.firstname + '.' + this.contactForm.value.lastname;
    this.contactForm.value.userType = 'NEW_USER';
    this.userService.postUserForm(this.contactForm.value).subscribe({
      next: (response) => {
        this.contactForm.reset();
      },
      error: (error) => {
        console.error('Error  ==>  ', error);
      }
    });
  }

}
