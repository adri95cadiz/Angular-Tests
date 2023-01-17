import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User, UserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) {}

  createUser(dto: UserDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
