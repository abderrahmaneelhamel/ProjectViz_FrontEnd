import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/NGRX/auth.actions';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/Interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = "http://localhost:8080";
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
  ) {}


  authenticate(credentials: { email: string; password: string }) {
    const authenticateUrl = `${this.apiUrl}/auth/authenticate`;

    this.http.post<any>(authenticateUrl, credentials).subscribe(
      (response: any) => {
        this.handleAuthenticationResponse(response);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Failed',
          text: 'Invalid email or password',
        });
      }
    );
  }
  

 
  private handleAuthenticationResponse(response: any) {
    const decodedToken = this.jwtHelper.decodeToken(response.access_token);
    const user: User = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      plan: decodedToken.planId,
      password: '',
      role: decodedToken.role.toLowerCase(),
    };
    console.log('====================================');
    console.log(user," - ",decodedToken);
    console.log('====================================');
    this.store.dispatch(
      AuthActions.loginSuccess({
        user: user,
        role : user.role,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      })
    );
    switch(user.role){
      case 'admin':
        this.router.navigate(['/dashboard']);
        break;
      case 'client':
        this.router.navigate(['/']);
        break;
    }
  }

  register(registerRequest: any) {
    const registerUrl = `${this.apiUrl}/auth/register`;

    this.http.post<any>(registerUrl, registerRequest).subscribe(
      (response: any) => {
        this.handleAuthenticationResponse(response);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered!',
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Error occurred during registration',
        });
      }
    );
  }

  logout() {
    const logoutUrl = `${this.apiUrl}/auth/logout`;

    this.http.post(logoutUrl, {}, { observe: 'response' }).subscribe(
      (response) => {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
      },
      (error) => {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
        
      }
    );
  }
}
