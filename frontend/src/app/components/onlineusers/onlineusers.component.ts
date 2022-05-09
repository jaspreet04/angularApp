import onlineUser from 'src/app/model/onlineUser';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-onlineusers',
  templateUrl: './onlineusers.component.html',
  styleUrls: ['./onlineusers.component.scss'],
})
export class OnlineusersComponent implements OnInit {
  constructor() {}
  @Input() onlineUsers!: onlineUser[];

  ngOnInit(): void {}
}
