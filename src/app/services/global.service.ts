import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

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

  deleteUser(id: number) {
    return this.http.delete(`/api/Global/DeleteUser?userId=${id}`)
    .pipe(
      tap(()=>this.getUsers().subscribe())
    )
  }

  //! ============================USERS END=============================

}
