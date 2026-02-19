import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiLink = 'https://httpbin.org/post';

  constructor(private http: HttpClient) { }

  createPost(data: any): Observable<any> {
    return this.http.post(this.apiLink, data) 
  }
}
