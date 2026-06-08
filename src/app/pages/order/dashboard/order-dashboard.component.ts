import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface WagonCounts {
  orderCount: number;
  wagonCount: number;
  wagonWeight: number;
}

interface CargoItem {
  cargo: string;
  weight: number;
}

interface TransportTypeItem {
  transportType: string;
  orderWeight: number;
}



@Component({
  selector: 'app-order-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent implements OnInit {
  private baseUrl = environment.apiUrl;
  private operationsApi = 'https://eurasia-dev.program.az';

  beginDate = this.formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  endDate = this.formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));

  beginYear = new Date().getFullYear();
  beginMonth = new Date().getMonth() + 1;
  endYear = new Date().getFullYear();
  endMonth = new Date().getMonth() + 1;

  selectedTransportType = 0;
  transportTypes = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Import' },
    { value: 2, label: 'Export' },
    { value: 3, label: 'Transit' },
    { value: 4, label: 'Local' }
  ];

  orderCount = 0;
  wagonCount = 0;
  wagonWeight = 0;

  cargoData: CargoItem[] = [];
  transportData: TransportTypeItem[] = [];
  totalCargoWeight = 0;
  totalTransportWeight = 0;

  isLoading = false;
  Math = Math;

  readonly CARGO_COLORS = ['#1e3a5f', '#2d6a9f', '#4a9fd4', '#7ec8e3', '#b8e0f7', '#d4f0ff'];
  readonly TRANSPORT_COLORS: Record<string, string> = {
    Import: '#1e3a5f',
    Export: '#2d6a9f',
    Transit: '#4a9fd4',
    Local: '#7ec8e3'
  };
   months = [
  { value: 1, label: '01' }, { value: 2, label: '02' },
  { value: 3, label: '03' }, { value: 4, label: '04' },
  { value: 5, label: '05' }, { value: 6, label: '06' },
  { value: 7, label: '07' }, { value: 8, label: '08' },
  { value: 9, label: '09' }, { value: 10, label: '10' },
  { value: 11, label: '11' }, { value: 12, label: '12' }
];

 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.loadCounts();
    this.loadCargo();
    this.loadTransportType();
  }

  loadCounts() {
    this.isLoading = true;
    const params = new HttpParams()
      .set('transportType', this.selectedTransportType)
      .set('beginDate', this.beginDate)
      .set('endDate', this.endDate);

    this.http.get<{ data: WagonCounts }>
      (`${this.operationsApi}/operations/api/Dashboard/GetRailwayOrderAndWagonCounts`, { params })
      .subscribe({
        next: (res) => {
          this.orderCount = res.data?.orderCount ?? 0;
          this.wagonCount = res.data?.wagonCount ?? 0;
          this.wagonWeight = res.data?.wagonWeight ?? 0;
          this.isLoading = false;
        },
        error: () => { this.isLoading = false; }
      });
  }

  loadCargo() {
    const params = new HttpParams()
      .set('transportType', this.selectedTransportType)
      .set('beginYear', this.beginYear)
      .set('beginMonth', this.beginMonth)
      .set('endYear', this.endYear)
      .set('endMonth', this.endMonth);

    this.http.get<{ data: CargoItem[] }>
      (`${this.operationsApi}/operations/api/Dashboard/GetRailwayOrderCargoDashboardData`, { params })
      .subscribe({
        next: (res) => {
          this.cargoData = res.data || [];
          this.totalCargoWeight = this.cargoData.reduce((s, i) => s + i.weight, 0);
        }
      });
  }

  loadTransportType() {
    const params = new HttpParams()
      .set('beginYear', this.beginYear)
      .set('beginMonth', this.beginMonth)
      .set('endYear', this.endYear)
      .set('endMonth', this.endMonth);

    this.http.get<{ data: TransportTypeItem[] }>
      (`${this.operationsApi}/operations/api/Dashboard/GetRailwayOrderTransportTypeDashboardData`, { params })
      .subscribe({
        next: (res) => {
          this.transportData = res.data || [];
          this.totalTransportWeight = this.transportData.reduce((s, i) => s + i.orderWeight, 0);
        }
      });
  }

  onFilterChange() {
    this.loadAll();
  }

  getDonutSegments(items: { value: number; color: string }[]): 
    { dasharray: string; dashoffset: string; color: string }[] {
    const r = 70;
    const circumference = 2 * Math.PI * r;
    const total = items.reduce((s, i) => s + i.value, 0) || 1;
    let offset = 0;
    return items.map(item => {
      const dash = (item.value / total) * circumference;
      const seg = {
        dasharray: `${dash.toFixed(1)} ${circumference.toFixed(1)}`,
        dashoffset: (-offset).toFixed(1),
        color: item.color
      };
      offset += dash;
      return seg;
    });
  }

  getCargoSegments() {
    return this.getDonutSegments(
      this.cargoData.map((c, i) => ({
        value: c.weight,
        color: this.CARGO_COLORS[i % this.CARGO_COLORS.length]
      }))
    );
  }

  getTransportSegments() {
    return this.getDonutSegments(
      this.transportData.map(t => ({
        value: t.orderWeight,
        color: this.TRANSPORT_COLORS[t.transportType] || '#ccc'
      }))
    );
  }

  getBarHeight(value: number, data: { weight?: number; orderWeight?: number }[]): number {
    const max = Math.max(...data.map((d: any) => d.weight ?? d.orderWeight ?? 0), 1);
    return Math.round((value / max) * 160);
  }

  formatDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  formatNumber(n: number): string {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

   print() {
   window.print();
   } 

  getPercent(value: number, total: number): string {
    if (!total) return '0.0';
    return ((value / total) * 100).toFixed(1);
  }
}