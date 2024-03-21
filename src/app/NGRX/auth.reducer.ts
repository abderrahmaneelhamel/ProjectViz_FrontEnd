import { createReducer, on } from '@ngrx/store';
import * as AuthActions from 'src/app/NGRX/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user, accessToken, refreshToken }) => ({
    ...state,
    isAuthenticated: true,
    user,
    accessToken,
    refreshToken,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
  }))
);
