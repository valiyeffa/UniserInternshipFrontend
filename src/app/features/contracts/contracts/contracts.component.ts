import { Component } from '@angular/core';

@Component({
  selector: 'app-contracts',
  imports: [],
  templateUrl: './contracts.component.html',
  styles: ``
})
export class ContractsComponent {
  rowsPerPage = 5;
  currentPage = 1;
  tableRows = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    data: `Data ${index + 1}`,
    info: `Info ${index + 1}`,
    tools: 'Tools',
  }));

  get totalPages(): number {
    return Math.ceil(this.tableRows.length / this.rowsPerPage);
  }

  get paginatedRows() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.tableRows.slice(start, start + this.rowsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
