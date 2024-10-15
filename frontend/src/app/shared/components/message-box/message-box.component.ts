import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../user/service/user.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class MessageBoxComponent implements OnInit {
  @Input() roomId: string = '';
  messages$ = this.chatService.messages$;
  username: string = '';
  messageFC: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.chatService.getAllMessages$().subscribe(messages => {
      this.messages$.next(messages);
    });
    this.chatService.getMessagesWS$().subscribe(messages => {
      this.messages$.next(messages);
    });
    this.userService.getProfile$().subscribe((user: any) => {
      this.username = user.username;
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.messageFC.value, this.username);
    this.messageFC.setValue('');
  }
}
