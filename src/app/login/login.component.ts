import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  loginForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      username: ['mor_2314', [Validators.required]],
      password: ['83r5^_', [Validators.required]]
    });

  }

  onSubmit() {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      // Simulasi login
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).then((result) => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          alert('Invalid email or password!');
        }
      });
    } else {
      alert('Please enter email and password!');
    }
  }
}
