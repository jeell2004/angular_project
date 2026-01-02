import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userlogindata } from '../interface/userdata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userdata {
  private API = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}
  signup(user: any): Observable<any> {
    return this.http.post(this.API, user);
  }

  // LOGIN
  login(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.API}?email=${email}&password=${password}`
    );
  }

}
