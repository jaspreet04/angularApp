import onlineUser from 'src/app/model/onlineUser';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-onlineusers',
  templateUrl: './onlineusers.component.html',
  styleUrls: ['./onlineusers.component.scss'],
})
export class OnlineusersComponent implements OnInit {
  @Output() selectUserEvent = new EventEmitter<string>();
  constructor() {}
  @Input() onlineUsers!: onlineUser[];

  ngOnInit(): void {}

  selectUser(value: string) {
    this.selectUserEvent.emit(value);
  }

}
