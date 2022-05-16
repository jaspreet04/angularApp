import onlineUser from 'src/app/model/onlineUser';
import messages from 'src/app/model/messages';
import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public _onlineUsers: onlineUser[] = [];
  public conversation: messages[] = [];
  constructor(private socketService: SocketService) {}
  public message = '';
  private selectedUser!: string;
  ngOnInit(): void {
    this.socketService.updateUsers();
    this.socketService.registerOperator('');
    this.socketService.OnupdateUsers().subscribe((data: any) => {
      this._onlineUsers = data;
    });

    this.socketService.onUpdateMessage().subscribe((data: any) => {
      console.log(this._onlineUsers);
      console.log(data.from +'=='+ this.selectedUser);
      if(data.from == this.selectedUser)
        this.conversation.push(data);
      else{
        this.incrementOrResetUreadMessages(false, data.from)
        console.log(this._onlineUsers)
      }
    });
  }

  private incrementOrResetUreadMessages(reset: boolean, userid:string) {
    var itemIndex = this._onlineUsers.findIndex(x => x.userId == userid);
    var item = this._onlineUsers[itemIndex];
    if(reset)
      item['unread'] = 0;
    else
      item['unread'] = (item.unread == null) ? 1 : item.unread+1;
    this._onlineUsers[itemIndex]=item;
  }

  selectUser(userId: string) {
    this.selectedUser = userId;
    this.incrementOrResetUreadMessages(true, userId)
  }

  sendMessage() {
    let message: messages = {
      message: this.message,
      from: 'operator',
      to: this.selectedUser,
    };

    this.conversation.push(message);
    this.socketService.sendMessage(message);
    this.message = '';
  }
}
