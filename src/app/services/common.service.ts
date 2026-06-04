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

  getContries(): Observable<any> {
    return this.http.get('/ComboBox/GetCountries');
  }

  getParkTypes(): Observable<any> {
    return this.http.get('/ComboBox/GetParkTypes');
  }

  getLoadPlansByCompany(companyId: number): Observable<any> {
    return this.http.get(`/ComboBox/GetLoadPlansByCompany?companyId=${companyId}`);
  }

  getTransportCategories(transportationModuleId: number): Observable<any> {
    return this.http.get(`/ComboBox/GetTransportCategories?transportationModuleId=${transportationModuleId}`);
  }

  getTransportTypeByCategory(categoryId: number): Observable<any> {
    return this.http.get(`/ComboBox/GetTransportTypesByCategory?categoryId=${categoryId}`);
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