import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WebService } from './web.service';
import { Router } from '@angular/router';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private cookieService: CookieService, private webService: WebService, private router: Router) { }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }

  loginUser(email: string, password: string) {
    return this.webService.post('login', { email, password });
  }

  signupUser(username:string, email: string, password: string) {
    return this.webService.post('signup', { username, email, password });
  }

  logoutUser() {
    this.cookieService.delete('token')
    this.router.navigate(['']);
  }

}
