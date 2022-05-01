import { WebService } from './web.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private webService: WebService) {}

  loginUser(email: string, password: string) {
    return this.webService.post('login', { email, password });
  }

  signupUser(username:string, email: string, password: string) {
    return this.webService.post('signup', { username, email, password });
  }
}
