import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import apiResponse from 'src/app/model/apiResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public loginError!: string;

  loginForm = this.formBuilder.group({
    userEmail: ['', [Validators.required, Validators.email]],
    userPassword: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private userService: UserService, 
    private cookieService: CookieService,
    private router: Router,
    private formBuilder :FormBuilder
  ) {}

  get userEmail() {
    return this.loginForm.get('userEmail');
  }

  get userPassword() {
    return this.loginForm.get('userPassword');
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.userEmail?.value + this.userPassword?.value)
    this.userService
      .loginUser(this.userEmail?.value, this.userPassword?.value)
      .subscribe({
        next: (res: apiResponse) => {
          console.log('User is logged in');
        if (res.status == 'ok'){
          this.cookieService.set('token', res.message);
          this.router.navigateByUrl('/dashboard');
        } 
        else alert(res.message);},
        error: (e) => { this.loginError = "Someting Went Wrong, Please Try Again"},
      });
  }
}
