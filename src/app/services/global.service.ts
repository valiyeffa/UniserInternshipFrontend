import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}
