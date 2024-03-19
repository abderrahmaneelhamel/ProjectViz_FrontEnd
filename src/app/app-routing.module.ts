import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './AuthGuard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';
import { ChatComponent } from './pages/chat/chat.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: { role: 'client' },
  },
  { 
    path: '', 
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'subscription-plans',
    component: SubscriptionPlansComponent,
    canActivate: [AuthGuard],
    data: { role: 'client' },
  },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
