import onlineUser  from 'src/app/model/onlineUser';
import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public _onlineUsers : onlineUser[] = []
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.updateUsers();
		this.socketService.OnupdateUsers()
      .subscribe((data: any) => {
        console.log(data)
        this._onlineUsers = data
      })
  }

}
