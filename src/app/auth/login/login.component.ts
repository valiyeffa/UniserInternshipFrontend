import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from '../../models/model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  })

  loginFunc() {
    const loginData = this.loginForm.value;

    this.authService.loginData(loginData as LoginForm).subscribe(
      {
        next: (v) => {
          if (v.status == false) {
            Swal.fire({
              title: "Error",
              text: v.message,
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Success",
              text: "Welcome to your account!",
              icon: "success",
            }).then(() => {
              this.router.navigate(['/']);
              localStorage.setItem("token", '1234');
            });
          }
          // console.log(v)
        },
        error: (e) => {
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error"
          });
          console.error(e)
        }
      }
    )
  }
}
