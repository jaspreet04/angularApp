import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import onlineUser from 'src/app/model/onlineUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private socketService: SocketService,
    private cookieService: CookieService
  ) {}
  user: onlineUser = {
    name: '',
    userId: '',
  };

  ngOnInit(): void {
    this.user.name = 'jaspreet';

    this.user.userId = this.getUserId();
    this.socketService.addNewUsers(this.user);
  }

  private getUserId() {
    if (this.cookieService.get('userid') != '') {
      return this.cookieService.get('userid');
    }

    return this.generateUserid();
  }

  private generateUserid() {
    let userid = 'user-' + Math.floor(new Date().getTime() / 1000);
    this.cookieService.set('userid', userid);
    return userid;
  }

  // ngOnDestroy() {
  //   this.socketService.disconnect(this.getUserId());
  // }
}

