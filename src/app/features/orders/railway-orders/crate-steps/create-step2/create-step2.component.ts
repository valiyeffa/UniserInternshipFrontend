import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonService } from '../../../../../services/common.service';
import { OrdersService } from '../../../orders.service';
import { ContractsService } from '../../../../contracts/contracts.service';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CreateStep1Component {
  newOrderNumber: any;
  transportTypes: any[] = [];
  countries: any[] = [];
  companies: any[] = [];
  customOrders: any[] = [];

  addendumIdOpt: any[] = [];
  addendumDetailOption: any[] = [];

  selectedBorderEntryStationId: any;
  selectedBorderExitStationId: any;
  selectedCargoId: any;

  clientOptionsCache: any[] = [];
  stationOptionsCache: any[] = [];
  destStationOptionsCache: any[] = [];
  selectedCompany: any;

  selectedLoadStation: any;
  selectedDestinationStation: any;

  myControl = new FormControl('');
  clientOptions$!: Observable<any[]>;
  stationOptions$!: Observable<any[]>;
  dastStationOptions$!: Observable<any[]>;

  @Output() scndForm = new EventEmitter<any>();

  constructor(
    private commonService: CommonService,
    private orderService: OrdersService,
    private contractService: ContractsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  private normalizeArray<T>(value: any): T[] {
    if (Array.isArray(value)) {
      return value;
    }
    if (value == null) {
      return [];
    }
    return [value];
  }

  orderWagons = new FormGroup({
    orderId: new FormControl({ value: '', disabled: true }),
    wagonNo: new FormControl(''),
    addendumTariffType: new FormControl(''),
    parkType: new FormControl(''),
    categoryId: new FormControl('', Validators.required),
    typeId: new FormControl({ value: '', disabled: true }),
    weight: new FormControl('', Validators.required),
    count: new FormControl(''),
  })

  ngOnInit() {
    this.commonService.getContries().subscribe({
      next: (res) => {
        this.countries = res.data
      }
    })

    this.commonService.getTransportTypes().subscribe({
      next: (res) => {
        this.transportTypes = res.data;
      }
    });

    const transportTypeC = this.orderWagons.get('transportType');
    const podcode = this.orderWagons.get('podcode');
    const warrantDate = this.orderWagons.get('warrantDate');

    transportTypeC?.valueChanges.subscribe((value: any) => {
      const id = Number(value);

      if (id === 2 || id === 4) {
        podcode?.enable({ emitEvent: false });
        warrantDate?.enable({ emitEvent: false });
      } else {
        podcode?.disable({ emitEvent: false });
        warrantDate?.disable({ emitEvent: false });
      }
    });
  }

  addOrderFunc() {
    const formData = this.orderWagons.getRawValue();

    // const payload = {
    //   ...formData,
    //   shippingCountryId: Number(formData.shippingCountryId),
    //   destinationCountryId: Number(formData.destinationCountryId),
    //   originCountryId: Number(formData.originCountryId),
    //   transportType: Number(formData.transportType),
    //   loadPlanId: Number(formData.loadPlanId),
    //   addendumDetailId: Number(formData.addendumDetailId),
    //   borderExitStationId: this.selectedBorderExitStationId || '',
    //   borderEntryStationId: this.selectedBorderEntryStationId || '',
    //   cargoId: this.selectedCargoId || '',
    //   shippingStationId: this.selectedLoadStation?.key || '',
    //   destinationStationId: this.selectedDestinationStation?.key || '',
    // };

    // const { addendumId, ...payloadForm } = payload;

    // this.scndForm.emit(payloadForm);

    // this.globalService.addUser(formData).subscribe({
    //   next: (res) => {
    //   // console.log(res);
    //     if (res.status == false) {
    //       Swal.fire({
    //         title: "Error",
    //         text: res.message,
    //         icon: "error"
    //       });
    //     } else {
    //       Swal.fire({
    //         title: "Success",
    //         text: "User successfuly added!",
    //         icon: "success",
    //       }).then(() => {
    //         this.router.navigate(['/modules/settings/users'])
    //       });
    //     }
    //   },
    //   error: (err) => {
    //     Swal.fire({
    //       title: "Error",
    //       text: "Something went wrong!",
    //       icon: "error"
    //     });
    //     console.error(err);
    //   }
    // })
  }
}
