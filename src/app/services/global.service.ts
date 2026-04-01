import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  private users = new BehaviorSubject<any[]>([]);
  users$ = this.users.asObservable();

  getModules() {
    return this.http.get<any>('/api/Global/GetModules')
  }

  getMenus(moduleId: number) {
    return this.http.get<any>(`/api/Global/GetMenus/${moduleId}`)
  }

  //! ============================USERS START=============================

  getUsers() {
    return this.http.get<any>('/api/Global/GetAllUsers')
  }

  getUserById(id: number) {
    return this.http.get<any>(`/api/Global/GetUserById?userId=${id}`)
  }

  addUser(data: any) {
    return this.http.post<any>('/api/Global/AddUser', data)
      .pipe(
        tap(() => this.getUsers().subscribe())
      )
  }

  editUser(data: any) {
    return this.http.post<any>('/api/Global/UpdateUser', data)
      .pipe(
        tap(() => this.getUsers().subscribe())
      )
  }

  deleteUser(id: number) {
    return this.http.delete(`/api/Global/DeleteUser?userId=${id}`)
      .pipe(
        tap(() => this.getUsers().subscribe())
      )
  }

  //! ============================USERS END=============================

}
