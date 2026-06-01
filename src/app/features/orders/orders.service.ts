import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  private ordersRefreshSubject = new Subject<void>();
  ordersRefresh$ = this.ordersRefreshSubject.asObservable();

  // ? ============================Orders START=============================

  getAllOrders(data: any) {
    return this.http.post<any>('/Orders/GetAllOrders', data)
      .pipe(
        tap(() => {
          this.ordersRefreshSubject.next();
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
          this.ordersRefreshSubject.next();
        })
      )
  }

  deleteContract(id: number) {
    return this.http.delete(`/Contracts/DeleteContract/${id}`)
      .pipe(
        tap(() => {
          this.ordersRefreshSubject.next();
        })
      )
  }

  // ? ============================Orders END=============================
}
