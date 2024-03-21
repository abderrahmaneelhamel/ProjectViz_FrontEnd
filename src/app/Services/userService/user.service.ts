import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { conversation } from 'src/app/Interfaces/Conversation';
import { User } from 'src/app/Interfaces/user';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl+"/user";

  constructor(private http: HttpClient) {}

  updateClientPlan(clientId: number, planId: number, cardToken: string): Observable<User> {
    const credentials = {
      userId: clientId.toString(),
      planId: planId.toString(),
      cardToken: cardToken
    };
    return this.http.post<User>(`${this.apiUrl}/update-plan`, credentials);
  }

  getConversations(clientId: number): Observable<conversation[]>{
    return this.http.get<conversation[]>(`${this.apiUrl}/conversations/${clientId}`);
  }

  deleteConversation(conversationId: number) {
    return this.http.delete<conversation[]>(`${this.apiUrl}/conversations/${conversationId}`);
  }

}
