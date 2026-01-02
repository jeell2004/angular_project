import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Userdata } from '../service/userdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  isLogin = true;

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private signupdata: Userdata,
    private router: Router
  ) {}

  toggle() {
    this.isLogin = !this.isLogin;
  }

  // ✅ MAIN SUBMIT HANDLER
  onSubmit() {
    if (this.isLogin) {
      this.loginUser();
    } else {
      this.signupUser();
    }
  }

  // 🔐 LOGIN
  loginUser() {
    this.signupdata.login(this.user.email, this.user.password)
      .subscribe(res => {
        if (res.length > 0) {

          // ✅ STORE USER IN LOCAL STORAGE
          localStorage.setItem('user', JSON.stringify(res[0]));
          localStorage.setItem('isLoggedIn', 'true');

          alert('Login successful');
          this.router.navigate(['/']);

        } else {
          alert('Invalid email or password');
        }
      });
  }

  // 📝 SIGNUP
  signupUser() {
    this.signupdata.signup(this.user).subscribe(() => {

      alert('Account created successfully');

      // ✅ OPTIONAL: AUTO LOGIN AFTER SIGNUP
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('isLoggedIn', 'true');

      this.router.navigate(['/']);

      // reset
      this.isLogin = true;
      this.user = { name: '', email: '', password: '' };
    });
  }
}
