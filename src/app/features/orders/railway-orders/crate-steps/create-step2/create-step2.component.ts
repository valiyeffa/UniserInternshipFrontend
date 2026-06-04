import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-step2',
  imports: [ReactiveFormsModule, NgClass, MatFormFieldModule, MatInputModule, MatAutocompleteModule, CommonModule],
  templateUrl: './create-step2.component.html',
  styles: ``
})

export class CreateStep2Component {
  parkTypes: any[] = [];
  typeOptions: any[] = [];
  transportCtgOptions: any[] = [];
  @Input() tariffOptions: any[] = [];

  constructor(private commonService: CommonService) { }

  customOrders: any[] = [];

  get fileInputDisabled(): boolean {
    return !this.orderWagons.get('parkType')?.value ||
      !this.orderWagons.get('categoryId')?.value ||
      !this.orderWagons.get('typeId')?.value;
  }

  orderWagons = new FormGroup({
    orderId: new FormControl({ value: '', disabled: true }),
    wagonNo: new FormControl(''),
    addendumTariffType: new FormControl(''),
    parkType: new FormControl(''),
    categoryId: new FormControl('', Validators.required),
    typeId: new FormControl(''),
    weight: new FormControl('', Validators.required),
    count: new FormControl(''),
  });

  ngOnInit() {
    this.commonService.getParkTypes().subscribe(res => {
      this.parkTypes = res.data;
    });

    this.commonService.getTransportCategories(1).subscribe(res => {
      this.transportCtgOptions = res.data;
    });

    const transportCtg = this.orderWagons.get('categoryId');

    transportCtg?.valueChanges.subscribe((val: any) => {
      const id = Number(val);

      this.commonService.getTransportTypeByCategory(id).subscribe(res => {
        this.typeOptions = res.data;
      });
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, {
        type: 'binary'
      });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const excelData: any[] =
        XLSX.utils.sheet_to_json(worksheet);

      const formValue = this.orderWagons.getRawValue();

      const mappedRows = excelData.map(row => ({
        wagonNo: row.wagonNo,
        weight: row.weight,
        count: row.count,

        addendumTariffType: formValue.addendumTariffType,
        parkType: formValue.parkType,
        categoryId: formValue.categoryId,
        typeId: formValue.typeId
      }));

      this.customOrders.push(...mappedRows);
    };

    reader.readAsBinaryString(file);
  }

  addToTable() {
    if (this.orderWagons.invalid) {
      this.orderWagons.markAllAsTouched();
      return;
    }

    this.customOrders.push({
      wagonNo: this.orderWagons.value.wagonNo,
      addendumTariffType: this.orderWagons.value.addendumTariffType,
      parkType: this.orderWagons.value.parkType,
      categoryId: this.orderWagons.value.categoryId,
      typeId: this.orderWagons.value.typeId,
      weight: this.orderWagons.value.weight,
      count: this.orderWagons.value.count,
    });
    this.orderWagons.reset();
  }

  removeRow(index: number) {
    this.customOrders.splice(index, 1);
  }
}