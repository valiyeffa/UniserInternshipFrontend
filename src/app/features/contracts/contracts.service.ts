import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(private http: HttpClient) { }

  private contractRefreshSubject = new Subject<void>();
  contractsRefresh$ = this.contractRefreshSubject.asObservable();

  // ? ============================CONTRACTS START=============================

  getAllContracts(data: any) {
    return this.http.post<any>('/Contracts/GetAllContracts', data)
      .pipe(
        tap(() => {
          this.contractRefreshSubject.next();
        })
      )
  }

  getContractsById(id: number) {
    return this.http.get<any>(`/Contracts/GetContractById/${id}`)
  }

  addOrUpdateContract(data: any) {
    return this.http.put<any>('/Contracts/AddOrUpdateContract', data)
      .pipe(
        tap(() => {
          this.contractRefreshSubject.next();
        })
      )
  }

  deleteContract(id: number) {
    return this.http.delete(`/Contracts/DeleteContract/${id}`)
      .pipe(
        tap(() => {
          this.contractRefreshSubject.next();
        })
      )
  }

  // ? ============================CONTRACTS END=============================

  // !=============================LOAD PLANS STAR===============================

  getLoadPlanById(id: number) {
    return this.http.get<any>(`/LoadPlans/GetLoadPlanById/${id}`)
  }

  // !=============================LOAD PLANS END===============================
  getAddendumById(id: number) {
    return this.http.get<any>(`/Addendums/GetAddendumById/${id}`)
  }

  getTariffValuesByAddendumDetailId(id: number) {
    return this.http.get<any>(`/Addendums/GetTariffValuesByAddendumDetailId/${id}`)
  }
}