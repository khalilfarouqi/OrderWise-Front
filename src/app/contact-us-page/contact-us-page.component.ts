import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from '../service/contact-us.service';

@Component({
  selector: 'app-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrl: './contact-us-page.component.css'
})
export class ContactUsPageComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private contactUsService:ContactUsService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  submitForm(): void {
    this.contactUsService.postContactUsForm(this.contactForm.value).subscribe({
      next: (response) => {
        this.contactForm.reset();
      },
      error: (error) => {
        console.error('Error  ==>  ', error);
      }
    });
  }

}
