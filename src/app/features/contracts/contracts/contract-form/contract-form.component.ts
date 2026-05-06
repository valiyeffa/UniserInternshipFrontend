import { CommonModule, NgClass } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ContractsService } from '../../contracts.service';

@Component({
  selector: 'app-contract-form',
  imports: [NgClass, ReactiveFormsModule, MatDialogContent, MatDialogActions, MatDialogClose, CommonModule],
  templateUrl: './contract-form.component.html',
  styles: ``
})
export class ContractFormComponent {
  constructor(
    public dialogRef: MatDialogRef<ContractFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contractService: ContractsService
  ) {
    this.selectedContract = data;
  }

  private readonly fb = inject(FormBuilder)
  contractForm: any = FormGroup;
  selectedContract: any = [];

  formatDateFromApi(date: string): string {
    if (!date) return '';

    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  }

  ngOnInit() {
    console.log(this.selectedContract);

    this.contractForm = this.fb.group({
      contractType: ['', Validators.required],
      company: ['', Validators.required],
      contractNo: ['', Validators.required],
      contractDate: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      endDate: ['', Validators.required],
    })

    if (this.selectedContract) {
      this.contractForm.patchValue({
        ...this.selectedContract,
        contractDate: this.formatDateFromApi(this.selectedContract.contractDate),
        effectiveDate: this.formatDateFromApi(this.selectedContract.effectiveDate),
        endDate: this.formatDateFromApi(this.selectedContract.endDate)
      });
    }
  }

  addContractFunc() {
    console.log(this.contractForm.value);

    // this.contractService.addOrUpdateContract(this.contractForm).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })
  }

  editContractFunc() {
    console.log(this.contractForm.value);
    // this.contractService.addOrUpdateContract(this.contractForm).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })
  }
}
