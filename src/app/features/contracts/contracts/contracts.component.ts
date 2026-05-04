import { Component } from '@angular/core';
import { ContractsService } from '../contracts.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contracts',
  imports: [RouterLink, CommonModule],
  templateUrl: './contracts.component.html',
  styles: ``
})
export class ContractsComponent {
  constructor(private contractService: ContractsService) { }
  currentPage = 1;
  rowsPerPage = 15;
  tableRows: any = [];
  postedData = {
    nextPageNumber: this.currentPage,
    visibleItemCount: this.rowsPerPage,
    // "filters": [
    //   { 
    // "columnName": "string",
    // "value": "string",
    //     "columnFilterType": 1
    //   }
    // ],
    // "orderedFields": [
    //   {
    // "columnName": "string",
    //     "order": 1
    //   }
    // ] 
  };

  ngOnInit() {
    this.contractService.getAllContracts(this.postedData).subscribe({
      next: (res) => {
        this.tableRows = res.data.result;
        this.currentPage = 1;

        console.log(this.tableRows);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

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
