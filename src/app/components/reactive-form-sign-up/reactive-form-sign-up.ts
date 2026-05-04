import { Component } from '@angular/core';
import { User } from '../../service/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form-sign-up.html',
  styleUrl: './reactive-form-sign-up.css',
})
export class ReactiveFormSignUp {

  UserProp: FormGroup;

  constructor(
    private userService: User,
    private router: Router
  ) {
    this.UserProp = new FormGroup({
      fname: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),

      lname: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),

      confirmPassword: new FormControl('', [
        Validators.required
      ])

    }, { validators: this.passwordMatchValidator });
  }

  // ✅ Password Match Validator
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // ✅ getter للسهولة في الـ HTML
  get f() {
    return this.UserProp.controls;
  }

  AddnewUser() {
    if (this.UserProp.invalid) return;

    // نشيل confirmPassword قبل ما نبعت
    const { confirmPassword, ...userData } = this.UserProp.value;

    this.userService.AddnewUser(userData).subscribe({
      next: (res) => {
        console.log(res);
        // After successful sign up, navigate to login page or home
        this.router.navigate(['/']); // or ['/login'] if you have a login route
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}