import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-davamiyyet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './davamiyyet.component.html',
  styleUrl: './davamiyyet.component.css'
})
export class DavamiyyetComponent {
  selectedGroup = 'all';
  selectedMonth = 'Mart';

  records = [
    { name: 'Aysel Məmmədova', group: 'FE-01', total: 20, present: 19 },
    { name: 'Tural Həsənov', group: 'FE-01', total: 20, present: 12 },
    { name: 'Nigar Əliyeva', group: 'FE-02', total: 20, present: 20 },
    { name: 'Kamran Quliyev', group: 'FE-02', total: 20, present: 15 },
    { name: 'Leyla Rəhimova', group: 'FE-03', total: 20, present: 8 },
    { name: 'Əli Babayev', group: 'FE-01', total: 20, present: 18 },
    { name: 'Günəl Hüseynova', group: 'FE-02', total: 20, present: 16 },
    { name: 'Rauf Nəsirov', group: 'FE-03', total: 20, present: 10 },
    { name: 'Sevinc Kazımova', group: 'FE-03', total: 20, present: 17 },
  ];

  get filteredRecords() {
    if (this.selectedGroup === 'all') return this.records;
    return this.records.filter(r => r.group === this.selectedGroup);
  }

  getPercent(record: any): number {
    return Math.round((record.present / record.total) * 100);
  }

  getPercentClass(record: any): string {
    const p = this.getPercent(record);
    if (p >= 80) return 'fill-green';
    if (p >= 60) return 'fill-yellow';
    return 'fill-red';
  }

  getStatusClass(record: any): string {
    const p = this.getPercent(record);
    if (p >= 80) return 'good';
    if (p >= 60) return 'warning';
    return 'critical';
  }

  getStatusText(record: any): string {
    const p = this.getPercent(record);
    if (p >= 80) return 'Yaxşı';
    if (p >= 60) return 'Xəbərdarlıq';
    return 'Kritik';
  }

  get goodAttendance(): number {
    return this.filteredRecords.filter(r => this.getPercent(r) >= 80).length;
  }

  get warningAttendance(): number {
    return this.filteredRecords.filter(r => this.getPercent(r) >= 60 && this.getPercent(r) < 80).length;
  }

  get badAttendance(): number {
    return this.filteredRecords.filter(r => this.getPercent(r) < 60).length;
  }
}