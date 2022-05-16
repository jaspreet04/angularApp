import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import onlineUser from 'src/app/model/onlineUser';
import { FormBuilder } from '@angular/forms';
import messages from 'src/app/model/messages';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  chatForm = this.formBuilder.group({
    message: '',
  });

  startChatForm = this.formBuilder.group({
    name: '',
    email: '',
  });

  public eixtingUser = false;
  user: onlineUser = {
    name: '',
    email: '',
    userId: '',
  };

  public conversation: messages[] = [];

  constructor(
    private socketService: SocketService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // if(this.isExistingUser()) {
    //   this.eixtingUser = true;
    //   this.addexistingUser();
    // }
    this.socketService.onUpdateMessage().subscribe((data: any) => {
      console.log(data)
      this.conversation.push(data)
    })
  }

  onSubmit(): void {
    this.addUser();
  }

  onSendMessage(): void {
    let message: messages = {
      message: this.chatForm.get('message')?.value,
      from: this.getUserId(),
      to: 'operator'
    };

    this.conversation.push(message);
    this.chatForm.controls['message'].setValue('');
    this.socketService.sendMessage(message);
  }

  private addUser() {
    this.user.name = this.startChatForm.get('name')?.value;
    this.user.email = this.startChatForm.get('email')?.value;
    this.cookieService.set('name', this.user.name);
    this.user.userId = this.getUserId();
    this.socketService.addNewUsers(this.user);
    this.eixtingUser = true;
  }

  // private addexistingUser(){
  //   this.user.name = this.chatForm.get('name')?.value;
  //   this.user.userId = this.getUserId();
  //   this.socketService.addNewUsers(this.user);
  //   this.eixtingUser = true;
  // }

  private getUserId() {
    if (this.isExistingUser()) {
      return this.cookieService.get('userid');
    }

    return this.generateUserid();
  }

  private isExistingUser() {
    return this.cookieService.get('userid') != '';
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
