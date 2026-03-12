import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  getData() {
    return ['Ali', 'Veli', 'Aysel'];
  }

  createPost(data: any): Observable<any> {
    // localStorage.setItem('token', '1234')
    return this.http.post('/post', data);
  }
}
