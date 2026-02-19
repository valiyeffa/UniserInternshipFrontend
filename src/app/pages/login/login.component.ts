import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isShowPass: boolean = false;

  changeVisibility() {
    this.isShowPass = !this.isShowPass;
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(private loginService: LoginService) { }

  loginApp() {
    if (this.loginForm.invalid) {
      alert('olmaz!');
      return;
    }

    const loginData = this.loginForm.value;

    this.loginService.createPost(loginData).subscribe(
      res => {
        alert('Ugurlu!');
        console.log('success', res);
      },
      err => console.error(err)
    )
  }

}
