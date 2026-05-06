import { Component, DestroyRef, effect, inject, signal, WritableSignal } from '@angular/core';
import { ContractsService } from '../contracts.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContractFormComponent } from './contract-form/contract-form.component';

@Component({
  selector: 'app-contracts',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contracts.component.html',
  styles: ``
})
export class ContractsComponent {
  constructor(private contractService: ContractsService) { }
  private readonly fb = inject(FormBuilder);
  filterForm!: FormGroup;
  filterData: any[] = [];
  currentPage: WritableSignal<number> = signal(1);
  rowsPerPage = 15;
  dataCount = 0;
  tableRows: any = [];
  readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  openDialog() {
    const dialogRef = this.dialog.open(ContractFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(ContractFormComponent, {
      data: data
    });
    console.log(data);
    // this. = data;
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      contractType: [''],
      company: [''],
      contractNo: [''],
      contractDate: [''],
      effectiveDate: [''],
      endDate: [''],
    });
  }

  pageEffect = effect(() => {
    this.loadContracts();
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
    this.loadContracts();
  }

  loadContracts() {
    const postedData = {
      nextPageNumber: this.currentPage(),
      visibleItemCount: this.rowsPerPage,
      filters: this.filterData
    };

    this.contractService.getAllContracts(postedData).subscribe({
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
