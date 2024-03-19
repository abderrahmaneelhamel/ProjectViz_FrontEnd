import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { promptRequest } from 'src/app/Interfaces/PromptRequest';
import { response } from 'src/app/Interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/bot/chat';

  constructor(private http: HttpClient) {}

  sendPrompt(prompt: promptRequest): Observable<response> {
    prompt.userId = prompt.userId+1;
    return this.http.post<any>(`${this.apiUrl}`, prompt);
  }
}
