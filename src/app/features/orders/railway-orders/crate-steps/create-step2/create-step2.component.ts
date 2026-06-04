import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../../../services/common.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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

}
