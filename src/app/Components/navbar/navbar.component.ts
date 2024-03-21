import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, createFeatureSelector, select } from '@ngrx/store';
import { AuthState } from 'src/app/NGRX/auth.reducer';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { selectAuthState } from 'src/app/NGRX/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  lastScrollPosition = 0;
  navbarHidden: boolean = false;
  authState$ = this.store.pipe(select(selectAuthState))

  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.authState$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }

  onScroll(event: any) {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollPosition > this.lastScrollPosition) {
      this.navbarHidden = true;
    } else {
      this.navbarHidden = false;
    }

    this.lastScrollPosition = currentScrollPosition;
  }
}
