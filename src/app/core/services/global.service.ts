import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Module {
  id: number;
  value: string;
  code: string;
  color: string;
  icon: string;
  url: string;
}
export interface Menu {
  id: number;
  value: string;
  parentId: number | null;
  subMenuExistStatus: boolean;
  menuType: number;
  icon: string;
  link: string;
  orderBy: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  finCode: string;
  gender: boolean;
  username: string;
  email: string;
  phone1: string;
  phone2: string;
  status: boolean;
}

export interface AddUserRequest {
  id: number;
  firstName: string;
  lastName: string;
  finCode: string;
  gender: boolean;
  username: string;
  password: string;
  email: string;
  phone1: string;
  phone2: string;
}

export interface UpdateUserRequest {
  id: number;
  firstName: string;
  lastName: string;
  finCode: string;
  gender: boolean;
  username: string;
  email: string;
  phone1: string;
  phone2: string;
  status: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getModules(): Observable<Module[]> {
    return this.http.get<ApiResponse<Module[]>>(`${this.apiUrl}/api/Global/GetModules`).pipe(
      map(r => r.data)
    );
  }

  getMenus(moduleId: number): Observable<Menu[]> {
    return this.http.get<ApiResponse<Menu[]>>(`${this.apiUrl}/api/Global/GetMenus/${moduleId}`).pipe(
      map(r => r.data)
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/api/Global/GetAllUsers`).pipe(
      map(r => r.data)
    );
  }

  addUser(data: AddUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/AddUser`, data);
  }

  updateUser(data: UpdateUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/UpdateUser`, data);
  }

deleteUser(userId: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/api/Global/DeleteUser`, {
    params: { userId: userId.toString() }
  });
}
}