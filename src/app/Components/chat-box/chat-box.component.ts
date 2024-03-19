import { Component, ViewChild, ElementRef } from '@angular/core';
import { promptRequest } from 'src/app/Interfaces/PromptRequest';
import { response } from 'src/app/Interfaces/response';
import { ChatService } from 'src/app/Services/chatService/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent {}