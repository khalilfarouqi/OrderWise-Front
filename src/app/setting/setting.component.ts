import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { City } from '../enum/city.enum';
import { User } from '../models/User';
import { Gender } from '../enum/gender.enum';
import { Role } from '../enum/role.enum';
import { UserType } from '../enum/userType.enum';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../service/wallet.service';
import { Wallet } from '../models/Wallet';
import { MyMoneyService } from '../service/my-money.service';
import { MyMoney } from '../models/MyMoney';
import Swal from 'sweetalert2';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFileService } from '../service/upload-file.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {

  userForm!: FormGroup;
  userInfoForm!: FormGroup;
  passwordForm!: FormGroup;
  myMoneyForm!: FormGroup;

  profileImage: string | undefined;
  selectedFile: File | null = null;
  previewUrl: any = null;

  message: string | undefined;
  error: string | undefined;

  selectedImage!: string;
  
  wallet: Wallet;

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
  cityEntries: { key: string, value: string }[] = [];
  genderEntries: { key: string, value: string }[] = [];

  initializeEnum() {
    this.cityEntries = Object.entries(City).map(([key, value]) => ({ key, value }));
    this.genderEntries = Object.entries(Gender).map(([key, value]) => ({ key, value }));
  }

  constructor(
    private userService: UserService, 
    private fb: FormBuilder,
    private walletService: WalletService,
    private myMoneyService: MyMoneyService,
    private uploadFileService: UploadFileService) { 
      const defaultUser: User = {
        id: 0, 
        username: '', 
        email: '',
        lastCheckIn: '',
        firstname: '',
        lastname: '',
        password: '',
        cin: '',
        tel: '',
        image: '',
        city: City.AGOURI_MEKNES,
        gender: Gender.MALE,
        role: Role.ADMIN,
        userType: UserType.ADMIN
      };
      this.wallet = {
        id: 0,
        sold: 0,
        amountCredited: 0,
        amountDeposited: 0,
        user: defaultUser,
        seller: defaultUser
      };
  }

  ngOnInit(): void {
    this.getProfile('khalil.farouqi');
    this.getWallatByUsername('khalil.farouqi');
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
    this.userInfoForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    });
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
    this.myMoneyForm = new FormGroup({
      user: new FormControl('', Validators.required),
      montant: new FormControl('', Validators.required)
    });
    this.initializeEnum();
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
  
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('newPassword')!.value;
    const confirmPassword = control.get('confirmNewPassword')!.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  getProfile(username: string) {
    this.userService.getProfile(username).subscribe(
      (data) => {
        this.profile = data;
        this.previewUrl = 'assets/' + this.profile.image;
      },
      (error) => {
        console.error('Error fetching profile : ', error);
      }
    );
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewUrl = e.target.result;
      reader.readAsDataURL(this.selectedFile);
    }

    if (!this.selectedFile) {
      return;
    }

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    // Replace the below URL with your own upload URL
    const uploadUrl = this.uploadFileService.apiUrl;

    fetch(uploadUrl, {
      method: 'POST',
      body: fd
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      this.showAlert('Upload error', error.message, 'error');
    });
  }

  submitUserForm(): void {
    this.userService.updateUserForm(this.userForm.value).subscribe({
      next: (response) => {
        this.showAlert('Update successful', '', 'success');
      },
      error: (error) => {
        this.showAlert('Update errorer', error, 'error');
        console.error('Error  ==>  ', error);
      }
    });
  }

  submitMyMoneyForm(): void {
    const data: MyMoney = {
      montant: this.myMoneyForm.value.montant,
      user: {
        username: 'khalil.farouqi'
      }
    };
    this.myMoneyService.postMyMoney(data).subscribe({
      next: (response) => {
        this.myMoneyForm.reset();
      },
      error: (error) => {
        this.showAlert('Vous avez un problem dans votre demande', error.error.message, 'error')
        console.error('Error  ==>  ', error);
      }
    });
  }

  submitUserInfoForm(): void {
    this.userInfoForm.value.username = 'khalil.farouqi';
    this.userService.updateUserForm(this.userInfoForm.value).subscribe({
      next: (response) => {
        this.showAlert('Update successful', '', 'success');
      },
      error: (error) => {
        console.error('Error  ==>  ', error);
      }
    });
  }

  submitPasswordForm(): void {
    this.passwordForm.value.username = 'khalil.farouqi';
    this.userService.updatePassword(this.passwordForm.value).subscribe({
      next: (response) => {
        this.message = 'Password changed successfully!';
        this.error = undefined;

        this.passwordForm.reset();
      },
      error: (error) => {
        this.error = 'Failed to change password. Please try again.';
        this.message = undefined;
      }
    });
  }

  getWallatByUsername(username: string) {
    this.walletService.getWallatByUsername(username).subscribe(
      (data) => {
        this.wallet = data;
      },
      (error) => {
        console.error('Error fetching wallet : ', error);
      }
    );
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
