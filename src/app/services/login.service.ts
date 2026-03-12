import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient,
    @Inject('Base_url') private config: any) { }

  getData() {
    return ['Ali', 'Veli', 'Aysel'];
  }

  createPost(data: any): Observable<any> {
    // localStorage.setItem('token', '1234')
    return this.http.post(this.config.apiUrl, data);
  }
}
