import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './AuthGuard';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subscription-plans',
    component: SubscriptionPlansComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
