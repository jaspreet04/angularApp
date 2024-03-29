import { WebService } from './web.service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private webService: WebService,
    private cookieService: CookieService,
    ) {}

  getUserConversation(userId:string) {
    return this.webService.post('onlineuser/messages', { userId });
  }

  getDashboardConversation(userId:string) {
    return this.webService.post('dashboard/messages', { userId });
  }

  getToken() {
    return this.cookieService.get('token');
  }

}
