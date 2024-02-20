import { UserService } from './../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import {
  AfterViewChecked,
  ElementRef,
  ViewChild,
  Component,
  OnInit,
} from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import onlineUser from 'src/app/model/onlineUser';
import { FormBuilder } from '@angular/forms';
import messages from 'src/app/model/messages';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewChecked {
  @ViewChild('conversationScroll')
  private conversationScrollContainer!: ElementRef;

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
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.scrollToBottom();
    if (this.isExistingUser()) {
      this.eixtingUser = true;
      this.getPreviousConversation();
      this.addexistingUser();
    }
    this.socketService.onUpdateMessage().subscribe((data: any) => {
      console.log(data);
      this.conversation.push(data);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.conversationScrollContainer.nativeElement.scrollTop =
        this.conversationScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private async getPreviousConversation() {
    await this.userService
      .getUserConversation(this.getUserId())
      .subscribe((data) => {
        this.conversation = data;
      });
  }

  onSubmit(): void {
    this.addUser();
  }

  onSendMessage(messageText: string): void {
    let message: messages = {
      message: messageText,
      from: this.getUserId(),
      to: 'operator',
    };

    this.conversation.push(message);
    this.socketService.sendMessage(message);
  }

  private addUser() {
    this.user.name = this.startChatForm.get('name')?.value;
    this.user.email = this.startChatForm.get('email')?.value;
    this.user.userId = this.getUserId();
    this.cookieService.set('online_user', JSON.stringify(this.user));
    this.socketService.addNewUsers(this.user);
    this.eixtingUser = true;
  }

  private addexistingUser() {
    let user = this.getExistingUser();
    console.log(user);
    this.socketService.addNewUsers(user);
    this.eixtingUser = true;
  }

  private getUserId() {
    if (this.isExistingUser()) {
      let user = JSON.parse(this.cookieService.get('online_user'));
      return user.userId;
    }

    return this.generateUserid();
  }

  private isExistingUser() {
    return this.cookieService.get('online_user') != '';
  }

  private getExistingUser() {
    return JSON.parse(this.cookieService.get('online_user'));
  }

  private generateUserid() {
    let userid = 'user-' + Math.floor(new Date().getTime() / 1000);
    return userid;
  }

  // ngOnDestroy() {
  //   this.socketService.disconnect(this.getUserId());
  // }
}
