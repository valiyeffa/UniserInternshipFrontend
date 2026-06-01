import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-railway-orders',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './railway-orders.component.html',
  styles: ``
})
export class RailwayOrdersComponent {
  constructor(private OrdersService: OrdersService) { }

  tableHeaders = [
    { name: 'Order', field: 'orderNo' },
    { name: 'Mode', field: 'transportTypeName' },
    { name: 'Company', field: 'company' },
    { name: 'Start date', field: 'startDate' },
    { name: 'End date', field: 'endDate' },
    { name: 'Load plan', field: 'loadPlanNumber' },
    { name: 'Addendum №', field: 'addendumNo' },
    { name: 'Cargo(QNQ/ETSNQ)', field: 'cargo' },
    { name: 'Count', field: 'wagonCount' },
    { name: 'Weight', field: 'wagonWeight' },
    { name: 'Loading station', field: 'shippingStation' },
    { name: 'Destination', field: 'destinationStation' },
    { name: 'Border entry', field: 'borderEntry' },
    { name: 'Border exit', field: 'borderExit' },
    { name: 'Warrant', field: 'podcode' },
    { name: 'Park', field: 'parkType' },
    { name: 'Create date', field: 'createDate' }
  ]

  private readonly fb = inject(FormBuilder);
  filterForm!: FormGroup;
  filterData: any[] = [];
  currentPage: WritableSignal<number> = signal(1);
  rowsPerPage = 15;
  dataCount = 0;
  tableRows: any = [];

  ngOnInit() {
    this.filterForm = this.fb.group({
      orderNo: [''],
      transportTypeName: [''],
      company: [''],
      startDate: [''],
      endDate: [''],
      loadPlanNumber: [''],
      addendumNo: [''],
      cargo: [''],
      wagonCount: [''],
      wagonWeight: [''],
      shippingStation: [''],
      destinationStation: [''],
      borderEntry: [''],
      borderExit: [''],
      podcode: [''],
      parkType: [''],
      createDate: ['']
    });
  }

  pageEffect = effect(() => {
    this.loadOrders();
  });

  handleFilter() {
    const filters = Object.keys(this.filterForm.value)
      .filter(key => {
        const value = this.filterForm.get(key)?.value;
        return value !== null && value !== undefined && value.length > 0;
      })
      .map(key => ({
        columnName: key,
        value: this.filterForm.get(key)?.value,
        columnFilterType: 1
      }));
    this.filterData = filters;
    this.loadOrders();
  }

  loadOrders() {
    const postedData = {
      nextPageNumber: this.currentPage(),
      visibleItemCount: this.rowsPerPage,
      filters: this.filterData
    };

    this.OrdersService.getAllOrders(postedData).subscribe({
      next: (res) => {
        this.tableRows = res.data.result;
        this.dataCount = res.data.count;
        // console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.dataCount / this.rowsPerPage);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.update(val => val + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(val => val - 1);
    }
  }
}
