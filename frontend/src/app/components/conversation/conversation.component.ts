import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import messages from 'src/app/model/messages';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  @ViewChild('conversationScroll')
  private conversationScrollContainer!: ElementRef;
  @Input() conversation!: messages[];
  constructor() { }

  ngOnInit(): void {
    this.scrollToBottom();
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

}
