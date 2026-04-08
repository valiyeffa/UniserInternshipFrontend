import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  constructor(private http: HttpClient) { }

  private global = new BehaviorSubject<any[]>([]);
  global$ = this.global.asObservable();

  private rolesRefreshSubject = new Subject<void>();
  rolesRefresh$ = this.rolesRefreshSubject.asObservable();

  private usersRefreshSubject = new Subject<void>();
  usersRefresh$ = this.usersRefreshSubject.asObservable();

  private modulesRefreshSubject = new Subject<void>();
  modulesRefresh$ = this.modulesRefreshSubject.asObservable();

  private menusRefreshSubject = new Subject<void>();
  menusRefresh$ = this.menusRefreshSubject.asObservable();

  getModules() {
    return this.http.get<any>('/api/Global/GetModules');
  }

  getMenus(moduleId: number) {
    return this.http.get<any>(`/api/Global/GetMenus/${moduleId}`);
  }

  // ? ======================ROLES START===============================

  getRoles() {
    return this.http.get<any>('/api/Global/GetAllRoles')
  }

  getNewRoleCode(){
    return this.http.get<any>('/api/Global/GetNewRoleCode')
  }

  addOrUpdateRole(data: any) {
    return this.http.post<any>('/api/Global/AddOrUpdateRole', data)
      .pipe(
        tap(() => {
          this.rolesRefreshSubject.next();
        })
      )
  }

  // ? ======================ROLES END==================================


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
        tap(() => {
          this.usersRefreshSubject.next();
        })
      )
  }

  editUser(data: any) {
    return this.http.post<any>('/api/Global/UpdateUser', data)
      .pipe(
        tap(() => {
          this.usersRefreshSubject.next();
        })
      )
  }

  deleteUser(id: number) {
    return this.http.delete(`/api/Global/DeleteUser?userId=${id}`)
      .pipe(
        tap(() => {
          this.usersRefreshSubject.next();
        })
      )
  }

  //! ============================USERS END=============================

}
