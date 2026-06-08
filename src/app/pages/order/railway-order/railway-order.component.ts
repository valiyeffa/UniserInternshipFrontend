import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService, RailwayOrder } from '../../../core/services/global.service';

@Component({
  selector: 'app-railway-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './railway-order.component.html',
  styleUrls: ['./railway-order.component.css']
})
export class RailwayOrderComponent implements OnInit {

  allOrders: RailwayOrder[] = [];
  filteredOrders: RailwayOrder[] = [];
  orders: RailwayOrder[] = [];
  selectedOrder: RailwayOrder | null = null;
  isLoading = true;
  errorMessage = '';
  showOperationsMenu = false;
  currentPage = 1;
  pageSize = 15;
  totalCount = 0;
  Math = Math;

  filters = {
    orderNo: '', transportTypeName: '', company: '', startDate: '', endDate: '',
    loadPlan: '', addendumNo: '', cargo: '', wagonCount: '', wagonWeight: '',
    shippingStation: '', destinationStation: '', borderEntry: '', borderExit: '',
    warrant: '', park: '', createDate: ''
  };

  activeFilterColumn: string | null = null;
  private filterTimeout: any;

  constructor(
    private globalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllOrders();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!(event.target as HTMLElement).closest('.filterable-th')) {
      this.activeFilterColumn = null;
    }
    this.showOperationsMenu = false;
  }

  toggleOperationsMenu(event: Event) {
    event.stopPropagation();
    this.showOperationsMenu = !this.showOperationsMenu;
  }

  openFilter(columnKey: string, event: MouseEvent) {
    event.stopPropagation();
    this.activeFilterColumn = columnKey;
    setTimeout(() => {
      const input = document.querySelector(`.inline-filter[data-col="${columnKey}"]`) as HTMLInputElement;
      if (input) input.focus();
    }, 20);
  }

  applyFilter(columnKey: string) {
    this.activeFilterColumn = null;
    this.currentPage = 1;
    this.applyFrontendFilter();
  }

  onFilterKeydown(event: KeyboardEvent, columnKey: string) {
    if (event.key === 'Enter') this.applyFilter(columnKey);
    else if (event.key === 'Escape') this.activeFilterColumn = null;
  }

  onFilterInput() {
    if (this.filterTimeout) clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.applyFrontendFilter();
    }, 400);
  }

  private applyFrontendFilter() {
    if (!this.allOrders.length) return;
    this.filteredOrders = this.allOrders.filter(order => {
      for (const [key, filterValue] of Object.entries(this.filters)) {
        if (!filterValue || filterValue.trim() === '') continue;
        let orderValue: any = (order as any)[this.mapFilterKeyToOrderField(key)];
        if (orderValue == null) return false;
        const filterLower = filterValue.toLowerCase().trim();
        const orderLower = String(orderValue).toLowerCase();
        if (!orderLower.includes(filterLower)) return false;
      }
      return true;
    });
    this.totalCount = this.filteredOrders.length;
    this.updatePagedOrders();
  }

  private mapFilterKeyToOrderField(key: string): string {
    const map: Record<string, string> = {
      orderNo: 'orderNo',
      transportTypeName: 'transportTypeName',
      company: 'company',
      startDate: 'startDate',
      endDate: 'endDate',
      loadPlan: 'loadPlanNumber',
      addendumNo: 'addendumNo',
      cargo: 'cargo',
      wagonCount: 'wagonCount',
      wagonWeight: 'wagonWeight',
      shippingStation: 'shippingStation',
      destinationStation: 'destinationStation',
      borderEntry: 'borderEntry',
      borderExit: 'borderExit',
      warrant: 'warrantDate',
      park: 'parkType',
      createDate: 'createDate'
    };
    return map[key] || key;
  }

  private updatePagedOrders() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.orders = this.filteredOrders.slice(start, start + this.pageSize);
  }

  loadAllOrders() {
    this.isLoading = true;
    this.errorMessage = '';
    this.globalService.getAllRailwayOrders({
      nextPageNumber: 1,
      visibleItemCount: 10000
    }).subscribe({
      next: (result) => {
        this.allOrders = result.data || [];
        this.filteredOrders = [...this.allOrders];
        this.totalCount = this.allOrders.length;
        this.updatePagedOrders();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Sifarişlər yüklənərkən xəta baş verdi!';
        this.isLoading = false;
      }
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize) || 1;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedOrders();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagedOrders();
  }

  selectOrder(order: RailwayOrder) {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }

  openCreateForm() {
    this.showOperationsMenu = false;
    this.router.navigate(['orders', 'railwayOrders', 'new-railwayOrders']);
  }

  openEditForm() {
    this.showOperationsMenu = false;
    if (!this.selectedOrder) return;
    this.router.navigate(['orders', 'railwayOrders', 'edit-railwayOrders', this.selectedOrder.id]);
  }

  deleteSelectedOrder() {
    this.showOperationsMenu = false;
    if (!this.selectedOrder) return;
    if (!confirm('Bu sifarişi silmək istədiyinizə əminsiniz?')) return;
    this.globalService.deleteRailwayOrder(this.selectedOrder.id).subscribe({
      next: () => {
        this.selectedOrder = null;
        this.loadAllOrders();
      },
      error: () => {
        this.errorMessage = 'Silinərkən xəta baş verdi!';
      }
    });
  }
}