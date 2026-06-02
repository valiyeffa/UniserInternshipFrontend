import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(private http: HttpClient) { }

  // !=============================COMBO BOXES===============================

  getTransportTypes(): Observable<any> {
    return this.http.get('/ComboBox/GetTransportTypes');
  }

  getLoadPlansByCompany(companyId: number): Observable<any> {
    return this.http.get(`/ComboBox/GetLoadPlansByCompany?companyId=${companyId}`);
  }

  // !=============================COMBO BOXES===============================

  // *=============================AUTOCOMPLETE START===============================

  getClients(data: any): Observable<any> {
    return this.http.get(`/AutoComplete/GetClients?filter=${data}`);
  }

  getAllPoints(data: any): Observable<any> {
    return this.http.get(`/AutoComplete/GetAllPoints?filter=${data}`)
  }

  // *=============================AUTOCOMPLETE END===============================
}