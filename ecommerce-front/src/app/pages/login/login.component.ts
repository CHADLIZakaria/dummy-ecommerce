import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FadeInOut } from '../../shared/animations/animations';
import { LoginService } from './services/login.service';

@Component({
  selector: 'ecom-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [FadeInOut(200, 300, true)]
})
export class LoginComponent {
  formBuilder = inject(FormBuilder)
  loginService = inject(LoginService)
  router = inject(Router)
  showPassword = false
  errorMessage = ''
  formLogin = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }  
  login() {
    this.loginService.login({
      username: this.formLogin.value.username!, 
      password: this.formLogin.value.password!
    }).subscribe(data => {
      if(data.status === 200) {
        this.router.navigate(['/'])
      }
      else {
        this.errorMessage = data.message
      }
    })
  }
}
