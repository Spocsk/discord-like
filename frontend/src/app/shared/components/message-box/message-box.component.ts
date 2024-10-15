import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit {
  @Input() roomId: string = '';
  messages: any[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.roomId) {
      this.chatService.sendMessage(this.roomId, this.newMessage);
      this.newMessage = '';
    }
  }
}
