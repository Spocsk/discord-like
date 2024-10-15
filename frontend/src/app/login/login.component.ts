import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Form, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
})
export class LoginComponent {
  usernameFC: FormControl<string> = new FormControl('', { nonNullable: true });
  passwordFC: FormControl<string> = new FormControl('', { nonNullable: true });

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.usernameFC.value, this.passwordFC.value);
  }
}
