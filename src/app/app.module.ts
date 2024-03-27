import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './pages/chat/chat.component';
import { PopupComponent } from './Components/popup/popup.component';
import { LoginComponent } from './pages/login/login.component';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './NGRX/auth.reducer';
import { CustomInterceptor } from './interceptor/costum.interceptor';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PopupComponent,
    LoginComponent,
    SubscriptionPlansComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    BrowserAnimationsModule,
    TableModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
