import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  clientRegisterForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
    
    this.clientRegisterForm = this.fb.group({
      fullName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  login() {
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.authenticate(loginData);
  }

  registerClient() {
    const clientForm = {
      fullName: this.loginForm.value.fullName,
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      role:'CLIENT'
    };
    this.authService.register(clientForm);
  }
}
