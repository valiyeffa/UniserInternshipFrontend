import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  isShowPass: boolean = false;
  isLoading: boolean = false;

  changeVisibility() {
    this.isShowPass = !this.isShowPass;
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  constructor(private loginService: LoginService) { }

  loginApp() {
    if (this.loginForm.invalid) {
      alert('Not allowed empty input!');
      return;
    }

    this.isLoading = true;

    const loginData = this.loginForm.value;

    this.loginService.createPost(loginData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        res => {
          console.log('success', res.json);
          alert('WELCOME '+ res.json.username + '!');
        },
        err => console.error(err)
      )
  }

}
