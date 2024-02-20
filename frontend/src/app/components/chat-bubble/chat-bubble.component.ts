import { Component, Input, OnInit } from '@angular/core';
import messages from 'src/app/model/messages';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {

  constructor() { }
  @Input() message!: messages;

  ngOnInit(): void {
  }

}
