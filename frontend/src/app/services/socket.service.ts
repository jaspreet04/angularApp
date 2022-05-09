import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {

   }

  updateUsers() {
		this.socket.emit('updateusers');
	} 

  OnupdateUsers() {
		return this.socket.fromEvent('updateusers');
	} 

  addNewUsers(data: any) {
		this.socket.emit('addnewuser',data);
	} 

  disconnect(userid: string) {
		this.socket.disconnect();
	} 
  
}
