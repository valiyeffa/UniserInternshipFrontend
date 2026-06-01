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

  getNewOrdersNumber() {
    return this.http.get<any>('/Orders/GetNewOrderNumber')
  }

  getOrderById(id: number) {
    return this.http.get<any>(`/Orders/GetOrderById/${id}`)
  }

  addOrUpdateOrder(data: any) {
    return this.http.put<any>('/Orders/AddOrUpdateOrder', data)
      .pipe(
        tap(() => {
          this.ordersRefreshSubject.next();
        })
      )
  }

  deleteOrder(id: number) {
    return this.http.delete(`/Orders/DeleteOrder/${id}`)
      .pipe(
        tap(() => {
          this.ordersRefreshSubject.next();
        })
      )
  }

  // ? ============================Orders END=============================
}
