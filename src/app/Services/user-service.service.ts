import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Result } from '../Models/result';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:7161/api/User'; 

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Result> {
    return this.http.get<Result>(this.baseUrl, { withCredentials: true });
  }

  addUser(user: User): Observable<Result> {
    return this.http.post<Result>(this.baseUrl, user);
  }

  updateUser(user: User, citizenId: number): Observable<Result> {
    console.log("update,service")
    return this.http.put<Result>(this.baseUrl + citizenId, user)
  }

  deleteUser(id?: number): Observable<Result> {
    console.log("delete");
    return this.http.delete<Result>(this.baseUrl+ '/' + id)
  }
}
