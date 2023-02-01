import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response';

const AUTHENTICATE_MUTATION = gql`mutation authenticateMutation($email: String!, $password: String!) {
    authenticate(input: {email: $email, password: $password}) {
      jwt
    }
  }`;

const AUTHENTICATION_KEY = "auth";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    token$ = new BehaviorSubject<string | null>(null);

    constructor(private apollo: Apollo) {
        const token = localStorage.getItem(AUTHENTICATION_KEY);
        this.token$.next(token);
    }

    login(email: string, password: string): Observable<AuthenticationResponse | undefined> {
        return this.apollo.mutate<{ authenticate: AuthenticationResponse }>({
            mutation: AUTHENTICATE_MUTATION,
            variables: {
                email,
                password
            }
        }).pipe(
            map(x => x.data!.authenticate),
            tap(x => this.authenticate(x))
        );
    }

    authenticate(x: AuthenticationResponse): void {
        const jwt = x.jwt;
        if (jwt) {
            localStorage.setItem(AUTHENTICATION_KEY, jwt);
        }
        this.token$.next(jwt);
    }
}

