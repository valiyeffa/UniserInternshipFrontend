import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Module {
  id: number;
  value: string;   // API returns "value"
  code: string;
  color: string;
  icon: string;
  url: string;
}

export interface Menu {
  id: number;
  value: string;   // API returns "value"
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

export interface Role {
  id: number;
  code: string;
  value: string;        // API returns "value" for role name in lists
  status: boolean;
  assignStatus: boolean;
}

export interface RoleMenu {
  id: number;
  value: string;        // API returns "value" for menu name
  assignStatus: boolean;
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

export interface AddRolesToUserRequest {
  userId: number;
  roleIds: number[];
}

export interface AddOrUpdateRoleRequest {
  id: number;
  name: string;    // ← API expects "name" (confirmed from Swagger Image 7)
  code: string;
  status: boolean;
}

export interface SaveRoleMenusRequest {
  roleId: number;
  menuIds: number[];
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

  // ── Modules & Menus ──────────────────────────────────────────────────────

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

  getMenusByModuleName(moduleName: string): Observable<Menu[]> {
    return this.getModules().pipe(
      map(modules => modules.find(m => m.value?.toLowerCase().includes(moduleName.toLowerCase()))?.id || 0),
      switchMap(moduleId => moduleId > 0 ? this.getMenus(moduleId) : of([])),
      catchError(() => of([]))
    );
  }

  // ── Users ────────────────────────────────────────────────────────────────

  getAllUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/api/Global/GetAllUsers`).pipe(
      map(r => r.data)
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/api/Global/GetUserById?userId=${userId}`).pipe(
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

  // ── User Roles ───────────────────────────────────────────────────────────

  getUserRolesById(userId: number): Observable<Role[]> {
    return this.http.get<ApiResponse<Role[]>>(
      `${this.apiUrl}/api/Global/GetUserRolesByUserId?userId=${userId}`
    ).pipe(
      map(r => r.data)
    );
  }

  addRolesToUser(data: AddRolesToUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/AddRolesToUser`, data);
  }

  // ── Roles ────────────────────────────────────────────────────────────────

  getAllRoles(): Observable<Role[]> {
    return this.http.get<ApiResponse<Role[]>>(`${this.apiUrl}/api/Global/GetAllRoles`).pipe(
      map(r => r.data)
    );
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<ApiResponse<Role>>(`${this.apiUrl}/api/Global/GetRoleById?roleId=${id}`).pipe(
      map(r => r.data)
    );
  }

  getNewRoleCode(): Observable<string> {
    return this.http.get<ApiResponse<string>>(`${this.apiUrl}/api/Global/GetNewRoleCode`).pipe(
      map(r => r.data)
    );
  }

  addOrUpdateRole(data: AddOrUpdateRoleRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/AddOrUpdateRole`, data);
  }

  // ── Role Menus ───────────────────────────────────────────────────────────

  getRoleMenusByRoleId(roleId: number): Observable<RoleMenu[]> {
    return this.http.get<ApiResponse<RoleMenu[]>>(
      `${this.apiUrl}/api/Global/GetRoleMenusByRoleId?roleId=${roleId}`
    ).pipe(
      map(r => r.data)
    );
  }

  saveRoleMenus(data: SaveRoleMenusRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/SaveRoleMenus`, data);
  }
}