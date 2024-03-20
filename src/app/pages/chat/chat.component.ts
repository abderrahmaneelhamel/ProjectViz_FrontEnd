import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { conversation } from 'src/app/Interfaces/Conversation';
import { promptRequest } from 'src/app/Interfaces/PromptRequest';
import { response } from 'src/app/Interfaces/response';
import { User } from 'src/app/Interfaces/user';
import { selectLoggedInUser } from 'src/app/NGRX/auth.selectors';
import { ChatService } from 'src/app/Services/chatService/chat.service';
import { UserService } from 'src/app/Services/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  @ViewChild('userPromptTextarea') userPromptTextarea!: ElementRef;
  userPrompt: string = '';
  response!: response;
  loading: boolean = false;
  minCharacters: number = 50;
  user$!: Observable<User>;
  Conversations : conversation[] = [];

  constructor(private chatService: ChatService, private store: Store,private userService: UserService,private router: Router) {
    this.user$ = this.store.pipe(select(selectLoggedInUser));
  }
  ngOnInit(): void {
    this.getConversations();
  }

  selectConversation(conversation: conversation) {
    this.response = conversation.response;
  }

  getConversations(){
    this.user$.subscribe(user => {
    this.userService.getConversations(user.id || 0).subscribe(Conversations => {
      this.Conversations = Conversations;
      console.log(this.Conversations);
    })
  })
  }

  deleteConversation(conversationId: number) {
    this.userService.deleteConversation(conversationId).subscribe(() => {
      this.getConversations();
      console.log(`Conversation with ID ${conversationId} deleted successfully.`);
    },(error) => {
      console.error('Error deleting conversation:', error);
    });
  }

  adjustTextareaRows() {
    const textarea = this.userPromptTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.rows = 1;
    const rows = Math.ceil(textarea.scrollHeight / textarea.clientHeight);
    textarea.rows = Math.min(rows + 1, 20);
  }

  submitPrompt() {
    const characterCount = this.userPrompt.length;
    const textarea = this.userPromptTextarea.nativeElement;

    if (characterCount < this.minCharacters) {
      Swal.fire({
        title: 'Oops! Your prompt is a bit small.',
        text: 'Please keep it over 50 characters to enable our AI model to generate an appropriate response.',
        icon: 'error',
      });
    } else {
      if (this.userPrompt.trim() !== '') {
        this.loading = true;
        this.user$.subscribe(user => {
          const prompt: promptRequest = { prompt: this.userPrompt , userId : user.id || 0};
          this.userPrompt = '';
          textarea.rows = 1;
          this.chatService.sendPrompt(prompt).subscribe((response) => {
            this.response = response;
            this.loading = false;
            this.getConversations()
            console.log(this.response);
          },
          (error)=>{
            if (error.status === 409) {
              Swal.fire({
                icon: 'error',
                title: 'over the limit',
                text: 'You have reached the maximum number of conversations for this plan',
              });
              this.router.navigate(['/subscription-plans']);
            }
          });
        });
      }
    }
  }

  splitIntoParagraphs(text: string, breakAfter: number): string[] {
    const paragraphs = text.split('\n');
    const result: string[] = [];

    paragraphs.forEach((paragraph) => {
      const sentences = paragraph.match(/[^.!?]+[.!?]+/g);

      if (sentences) {
        let currentList: string[] = [];
        sentences.forEach((sentence) => {
          currentList.push(sentence.trim());
          if (currentList.length === breakAfter) {
            result.push(currentList.join(' '));
            currentList = [];
          }
        });

        if (currentList.length > 0) {
          result.push(currentList.join(' '));
        }
      } else {
        result.push(paragraph.trim());
      }
    });

    return result;
  }
}