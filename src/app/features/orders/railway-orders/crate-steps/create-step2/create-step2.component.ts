import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-create-step2',
  imports: [ReactiveFormsModule, NgClass, MatFormFieldModule, MatInputModule, MatAutocompleteModule, CommonModule, MatSlideToggleModule],
  templateUrl: './create-step2.component.html',
  styles: ``
})

export class CreateStep2Component {
  parkTypes: any[] = [];
  typeOptions: any[] = [];
  transportCtgOptions: any[] = [];
  editingIndex: number | null = null;
  isManualMode = false;

  typeMap: Record<number, string> = {};

  @Input() tariffOptions: any[] = [];

  constructor(private commonService: CommonService) { }
  
  getCleanOrders() {
    return this.customOrders.map(({
      wagonNo,
      weight,
      count,
      addendumTariffType,
      parkType,
      categoryId,
      typeId
    }) => ({
      wagonNo,
      weight,
      count,
      addendumTariffType,
      parkType,
      categoryId,
      typeId
    }));
  }

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

  onToggle(value: boolean) {
    this.isManualMode = value;
    this.setToggleState(value);
  }

  setToggleState(isManual: boolean) {
    const wagonNo = this.orderWagons.get('wagonNo');
    const count = this.orderWagons.get('count');

    if (!isManual) {
      wagonNo?.enable();
      count?.disable();
    } else {
      wagonNo?.disable();
      count?.enable();
    }
  }

  ngOnInit() {
    this.setToggleState(false);

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

        this.typeMap = {};
        res.data.forEach((x: any) => {
          this.typeMap[x.key] = x.value;
        });

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
        categoryId: Number(formValue.categoryId),
        typeId: Number(formValue.typeId),

        categoryName: this.transportCtgOptions.find(x => x.key == formValue.categoryId)?.value,
        typeName: this.typeOptions.find(x => x.key == formValue.typeId)?.value,
        parkName: this.parkTypes.find(x => x.key == formValue.parkType)?.value,
        tariffName: this.tariffOptions.find(x => x.key == formValue.addendumTariffType)?.value,
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

    const formData = this.orderWagons.getRawValue();

    const selectedType = this.typeOptions.find(
      x => x.key == formData.typeId
    );

    const selectedCategory = this.transportCtgOptions.find(
      x => x.key == formData.categoryId
    );

    const selectedPark = this.parkTypes.find(
      x => x.key == formData.parkType
    );

    const selectedTariff = this.tariffOptions.find(
      x => x.key == formData.addendumTariffType
    );

    const payload = {
      ...formData,

      categoryId: Number(formData.categoryId),
      typeId: Number(formData.typeId),

      categoryName: selectedCategory?.value,
      typeName: selectedType?.value,
      parkName: selectedPark?.value,
      tariffName: selectedTariff?.value
    };

    if (this.editingIndex !== null) {
      this.customOrders[this.editingIndex] = payload;
      this.editingIndex = null;
    } else {
      this.customOrders.push(payload);
    }

    this.orderWagons.reset();
  }

  editRow(index: number, item: any) {
    this.orderWagons.patchValue(item);
    this.editingIndex = index;
  }

  removeRow(index: number) {
    this.customOrders.splice(index, 1);
  }

  // !==========================================================

}