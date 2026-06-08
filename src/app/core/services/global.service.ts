import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service'; 

// interfeysler

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

export interface Role {
  id: number;
  code: string;
  name: string;
  status: boolean;
  assignStatus: boolean | number;
}

export interface RoleMenu {
  id: number;
  name: string;
  assignStatus: boolean;
}

export interface RailwayOrder {
  id: number;
  orderNo: string;
  transportTypeName: string;
  transportTypeId?: number;
  startDate: string;
  endDate: string;
  loadPlan?: string;
  loadPlanId?: number;
  addendumNo?: string;
  loadPlanNumber?: string;
  addendumDetails?: string;
  cargo?: string;
  wagonCount?: number;
  wagonWeight?: number;
  shippingStation?: string;
  shippingStationId?: number;
  destinationStation?: string;
  destinationStationId?: number;
  borderEntry?: string;
  borderEntryId?: number;
  borderExit?: string;
  borderExitId?: number;
  warrant?: string;
  parkType?: string;
  createDate?: string;
  company?: string;
  companyId?: number;
  consignor?: string;
  consignee?: string;
  shippingCountry?: string;
  shippingCountryId?: number;
  destinationCountry?: string;
  destinationCountryId?: number;
  originOfCargo?: string;
  originOfCargoId?: number;
  emptyReturn?: boolean;
  yds?: string;
  note?: string;
  customerOrder?: string;
  warrantNumber?: string;
  warrantDate?: string;
  orderStatusName?: string;
}

export interface Wagon {
  id?: number;
  wagonNo?: string;
  parkType?: number;
  parkTypeName?: string;
  categoryId?: number;
  categoryName?: string;
  typeId?: number;
  typeName?: string;
  weight?: number;
  count?: number;
  addendumTariffType?: number;
  selectedTariff?: string;
  // Form üçün
  number?: string;
  tariffId?: number;
  tariff?: string;
  park?: string;
  parkId?: number;
  category?: string;
  type?: string;
}

export interface GetAllOrdersRequest {
  nextPageNumber?: number;
  visibleItemCount?: number;
  transportType?: number;
  search?: string;
}

export interface OrderWagonCount {
  ordersCount: number;
  wagonsCount: number;
  weightCount: number;
}

export interface OrderByCompany {
  company: string;
  orderCount: number;
  percentage: number;
}

export interface LoadCirculation {
  import: number;
  export: number;
  transit: number;
  local: number;
  total: number;
}

export interface OrderProduct {
  product: string;
  count: number;
  percentage: number;
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
  name: string;
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

@Injectable({ providedIn: 'root' })
export class GlobalService {
  // url formalari 
  private apiUrl        = environment.apiUrl;
  private baseUrl       = 'https://eurasia-dev.program.az';
  private operationsApi = `${this.baseUrl}/operations/api`;
  private comboBoxApi   = `${this.baseUrl}/common/api/ComboBox`;
  private contractsApi  = `${this.baseUrl}/contracts/api`;
  private autoCompleteApi = `${this.baseUrl}/common/api/AutoComplete`;

  constructor(private http: HttpClient , private authService: AuthService) {}

  private handleResponse<T>(defaultValue: T) {
    return (response: any): T => {
      return response?.data ?? response?.result ?? response ?? defaultValue;
    };
  }

    private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // AuthService-dən token al
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // modul ve menular
  getModules(): Observable<Module[]> {
    return this.http.get<ApiResponse<Module[]>>(`${this.apiUrl}/api/Global/GetModules`)
      .pipe(map(r => r.data));
  }

  getMenus(moduleId: number): Observable<Menu[]> {
    return this.http.get<ApiResponse<Menu[]>>(`${this.apiUrl}/api/Global/GetMenus/${moduleId}`)
      .pipe(map(r => r.data));
  }

  getMenusByModuleName(moduleName: string): Observable<Menu[]> {
    return this.getModules().pipe(
      map(modules => modules.find(m => m.value?.toLowerCase().includes(moduleName.toLowerCase()))?.id || 0),
      switchMap(moduleId => moduleId > 0 ? this.getMenus(moduleId) : of([])),
      catchError(() => of([]))
    );
  }

  // istifadeciler ve rollar hissesi

  getAllUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/api/Global/GetAllUsers`)
      .pipe(map(r => r.data));
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/api/Global/GetUserById?userId=${userId}`)
      .pipe(map(r => r.data));
  }

  addUser(data: AddUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/AddUser`, data);
  }

  updateUser(data: UpdateUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/UpdateUser`, data);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/Global/DeleteUser`, {
      params: { userId: userId.toString() }
    });
  }

  getUserRolesById(userId: number): Observable<Role[]> {
    return this.http.get<ApiResponse<Role[]>>(
      `${this.apiUrl}/api/Global/GetUserRolesByUserId?userId=${userId}`
    ).pipe(map(r => r.data));
  }

  addRolesToUser(data: AddRolesToUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/AddRolesToUser`, data);
  }

  // rollar

  getAllRoles(): Observable<Role[]> {
    return this.http.get<ApiResponse<Role[]>>(`${this.apiUrl}/api/Global/GetAllRoles`)
      .pipe(map(r => r.data));
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<ApiResponse<Role>>(`${this.apiUrl}/api/Global/GetRoleById?roleId=${id}`)
      .pipe(map(r => r.data));
  }

  getNewRoleCode(): Observable<string> {
    return this.http.get<ApiResponse<string>>(`${this.apiUrl}/api/Global/GetNewRoleCode`)
      .pipe(map(r => r.data));
  }

  addOrUpdateRole(data: AddOrUpdateRoleRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/AddOrUpdateRole`, data);
  }

  getRoleMenusByRoleId(roleId: number): Observable<RoleMenu[]> {
    return this.http.get<ApiResponse<RoleMenu[]>>(
      `${this.apiUrl}/api/Global/GetRoleMenusByRoleId?roleId=${roleId}`
    ).pipe(map(r => r.data));
  }

  saveRoleMenus(data: SaveRoleMenusRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Global/SaveRoleMenus`, data);
  }

  //comboBoxlar ve diger umumilesdirilmis melumatlar

  getNewOrderNumber(): Observable<string> {
    return this.http.get<any>(`${this.operationsApi}/Orders/GetNewOrderNumber`)
      .pipe(map(this.handleResponse('')), catchError(() => of('')));
  }

  getTransportTypes(): Observable<any[]> {
    return this.http.get<any>(`${this.comboBoxApi}/GetTransportTypes`)
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getParkTypes(): Observable<any[]> {
    return this.http.get<any>(`${this.comboBoxApi}/GetParkTypes`)
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any>(`${this.comboBoxApi}/GetCountries`)
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getBorderStations(): Observable<any[]> {
    return this.http.get<any>(`${this.comboBoxApi}/GetBorderStations`)
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getServices(): Observable<any[]> {
    return this.http.get<any>(`${this.comboBoxApi}/GetServices`)
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getTransportCategories(moduleId: number = 1): Observable<any[]> {
    return this.http.get<any>(`${this.comboBoxApi}/GetTransportCategories`, {
      params: { transportationModuleId: moduleId.toString() }
    }).pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getTransportTypesByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any>(`${this.comboBoxApi}/GetTransportTypesByCategory`, {
      params: { categoryId: categoryId.toString() }
    }).pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getClients(filter: string): Observable<any[]> {
    return this.http.get<any>(`${this.autoCompleteApi}/GetClients`, { params: { filter } })
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getPoints(filter: string): Observable<any[]> {
    return this.http.get<any>(`${this.autoCompleteApi}/GetAllPoints`, { params: { filter } })
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  
  getLoadPlansByCompany(companyId: number): Observable<any> {
  return this.http.get(`${this.comboBoxApi}/GetLoadPlansByCompany?companyId=${companyId}`, {
    headers: this.getAuthHeaders()
  }).pipe(map(this.handleResponse([])), catchError(() => of([])));
}

  getLoadPlanById(id: number): Observable<any> {
    return this.http.get(`${this.contractsApi}/LoadPlans/GetLoadPlanById/${id}`)
      .pipe(map(this.handleResponse(null)), catchError(() => of(null)));
  }

  getAddendumsByLoadPlan(loadPlanId: number): Observable<any> {
    return this.http.get(`${this.contractsApi}/Addendums/GetAddendumsByLoadPlanId/${loadPlanId}`)
      .pipe(map(this.handleResponse(null)), catchError(() => of(null)));
  }

  getAddendumById(addendumId: number): Observable<any> {
    return this.http.get(`${this.contractsApi}/Addendums/GetAddendumById/${addendumId}`)
      .pipe(map(this.handleResponse(null)), catchError(() => of(null)));
  }

  getAddendumDetailById(detailId: number): Observable<any> {
    return this.http.get(`${this.contractsApi}/Addendums/GetAddendumDetailById/${detailId}`)
      .pipe(map(this.handleResponse(null)), catchError(() => of(null)));
  }

  getTariffValuesByAddendumDetailId(detailId: number): Observable<any> {
    return this.http.get(`${this.contractsApi}/Addendums/GetTariffValuesByAddendumDetailId/${detailId}`)
      .pipe(map(this.handleResponse(null)), catchError(() => of(null)));
  }

  // railway orderlar ve wagonslar

  getAllRailwayOrders(body: GetAllOrdersRequest = {}): Observable<{ data: RailwayOrder[]; total: number }> {
    return this.http.post<any>(`${this.operationsApi}/Orders/GetAllOrders`, body).pipe(
      map(r => {
        const items: RailwayOrder[] = r?.data?.result ?? [];
        const total: number = r?.data?.count ?? items.length;
        return { data: items, total };
      }),
      catchError(() => of({ data: [], total: 0 }))
    );
  }

  getRailwayOrderById(id: number): Observable<RailwayOrder | null> {
    return this.http.get<any>(`${this.operationsApi}/Orders/GetOrderById/${id}`)
      .pipe(map(this.handleResponse(null)), catchError(() => of(null)));
  }

  createRailwayOrder(body: Partial<RailwayOrder>): Observable<any> {
    return this.http.post(`${this.operationsApi}/Orders/CreateOrder`, body);
  }

  updateRailwayOrder(data: Partial<RailwayOrder>): Observable<any> {
    return this.http.put(`${this.operationsApi}/Orders/UpdateOrder/${data.id}`, data);
  }

  deleteRailwayOrder(id: number): Observable<any> {
    return this.http.delete(`${this.operationsApi}/Orders/DeleteOrder/${id}`)
      .pipe(catchError(() => of(null)));
  }

  // wagonslarla elaqeli melumatlar ve emeliyyatlar

  getWagonsByOrderId(orderId: number): Observable<Wagon[]> {
    return this.http.get<any>(`${this.operationsApi}/Orders/GetWagonsByOrderId/${orderId}`)
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  addWagon(orderId: number, wagon: Wagon): Observable<any> {
    return this.http.post(`${this.operationsApi}/Orders/AddWagon`, { orderId, ...wagon });
  }

  deleteWagon(wagonId: number): Observable<any> {
    return this.http.delete(`${this.operationsApi}/Orders/DeleteWagon/${wagonId}`);
  }

  // dashboard ucun melumatlar

  getOrderAndWagonCounts(params: {
    transportType: number;
    beginDate: string;
    endDate: string;
  }): Observable<any> {
    return this.http.get<any>(`${this.operationsApi}/Dashboard/GetRailwayOrderAndWagonCounts`, {
      params: {
        transportType: params.transportType.toString(),
        beginDate: params.beginDate,
        endDate: params.endDate
      }
    }).pipe(map(this.handleResponse({})), catchError(() => of({ orderCount: 0, wagonCount: 0, wagonWeight: 0 })));
  }

  getOrdersByCompany(year: number): Observable<OrderByCompany[]> {
    return this.http.get<any>(`${this.operationsApi}/Orders/GetOrdersByCompany`, {
      params: { year: year.toString() }
    }).pipe(map(this.handleResponse([])), catchError(() => of([])));
  }

  getLoadCirculation(beginMonth: string, endMonth: string): Observable<LoadCirculation> {
    return this.http.get<any>(`${this.operationsApi}/Orders/GetLoadCirculation`, {
      params: { beginMonth, endMonth }
    }).pipe(map(this.handleResponse({ import: 0, export: 0, transit: 0, local: 0, total: 0 })), catchError(() => of({
      import: 0, export: 0, transit: 0, local: 0, total: 0
    })));
  }

  getOrderProducts(params: {
    transportType?: number;
    beginMonth?: string;
    endMonth?: string;
  }): Observable<OrderProduct[]> {
    return this.http.get<any>(`${this.operationsApi}/Orders/GetOrderProducts`, { params: params as any })
      .pipe(map(this.handleResponse([])), catchError(() => of([])));
  }
}