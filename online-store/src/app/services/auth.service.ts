import { switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((auth) => {
          this.tokenService.saveToken(auth.access_token);
        })
      );
  }

  getProfile() {
    //let headers = new HttpHeaders();
    //headers = headers.set('Authorization', `Bearer ${token}`);
    //headers = headers.set('Content-type', 'application/json');
    return this.http.get<User>(`${this.apiUrl}/profile`, { /*headers*/ });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(
      switchMap(() => this.getProfile())
    );
  }
}
