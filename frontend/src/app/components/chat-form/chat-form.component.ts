import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  @Output() onSubmitEvent = new EventEmitter<string>();

  chatForm = this.formBuilder.group({
    message: '',
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.onSubmitEvent.emit(this.chatForm.get('message')?.value);
    this.chatForm.controls['message'].setValue('');
  }

}
