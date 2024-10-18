import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  @ViewChild('messageContainer') messageContainer: ElementRef<HTMLDivElement> | undefined;

  colors: string[] = ['#00b894', '#0984e3', '#6c5ce7', '#ff7675', '#fd79a8', '#e17055'];
  roomId$: Observable<string> = this.chatService.getRoomId$();
  messages$: BehaviorSubject<any[]> = this.chatService.messages$;
  username: string = '';
  messageFC: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.roomId$.subscribe(roomId => {
      if (!roomId) return;
      this.chatService.getMessagesFromRoomId$(roomId).subscribe(messages => {
        this.messages$.next(messages);
      });
      this.chatService.listenToMessagesRoom(roomId);
    });
    this.messages$.subscribe(message => {
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    });
    this.userService.getProfile$().subscribe((user: any) => {
      this.username = user.username;
    });
  }

  sendMessage() {
    this.roomId$.subscribe(roomId => {
      if (!roomId) return;
      this.chatService.sendMessage(this.messageFC.value, this.username, roomId);
    });
    this.messageFC.setValue('');
  }

  scrollToBottom() {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }
  }

  setMessageColor(message: any) {
    if (this.checkIfMessageIsFromUser(message)) {
      return { 'background-color': this.colors[1] };
    } else {
      return { 'background-color': this.colors[5] };
    }
  }

  checkIfMessageIsFromUser(message: any) {
    return message.sender === this.username;
  }
}
