import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  @Output() onSubmitEvent = new EventEmitter<string>();
  public message = '';
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onSubmitEvent.emit(this.message);
  }

}
