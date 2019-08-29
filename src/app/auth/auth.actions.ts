import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set unauthenticated';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnAuthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnAuthenticated;
