import  messages  from 'src/app/model/messages';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  updateUsers() {
    this.socket.emit('updateusers');
  }

  OnupdateUsers() {
    return this.socket.fromEvent('updateusers');
  }

  addNewUsers(data: any) {
    this.socket.emit('addnewuser', data);
  }

  registerOperator(data :any) {
    this.socket.emit('registeroperator', data);
  }

  onUpdateMessage() {
    return this.socket.fromEvent('message');
  }

  sendMessage(data: messages) {
	this.socket.emit('message', data)
  }

  disconnect(userid: string) {
    this.socket.disconnect();
  }
}
