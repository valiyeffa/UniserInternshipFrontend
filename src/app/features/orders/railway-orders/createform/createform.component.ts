import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { OrdersService } from '../../orders.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonService } from '../../../../services/common.service';
import { ContractsService } from '../../../contracts/contracts.service';

@Component({
  selector: 'app-createform',
  imports: [ReactiveFormsModule, RouterLink, NgClass, MatFormFieldModule, MatInputModule, MatAutocompleteModule, AsyncPipe, CommonModule],
  templateUrl: './createform.component.html',
  styles: [
    `
      input:disabled,
      select:disabled,
      textarea:disabled {
        background-color: #f8fafc;
        border-color: #cbd5e1;
        color: #64748b;
        cursor: not-allowed;
      }
    `
  ]
})

export class CreateformComponent {
  newOrderNumber: any;
  transportTypes: any[] = [];
  companies: any[] = [];
  customOrders: any[] = [];

  addendumIdOpt: any[] = [];
  addendumDetailOption: any[] = [];

  clientOptionsCache: any[] = [];
  selectedCompany: any;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  clientOptions$!: Observable<any[]>;

  constructor(
    private commonService: CommonService,
    private orderService: OrdersService,
    private contractService: ContractsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private normalizeArray<T>(value: any): T[] {
    if (Array.isArray(value)) {
      return value;
    }
    if (value == null) {
      return [];
    }
    return [value];
  }

  onCompanySelected(event: MatAutocompleteSelectedEvent) {
    this.selectedCompany = event.option.value;

    this.orderForm.patchValue({
      company: this.selectedCompany.key
    });

    this.commonService.getLoadPlansByCompany(this.selectedCompany.key).subscribe({
      next: (res) => {
        this.customOrders = this.normalizeArray<any>(res.data);

        const loadPlan = this.orderForm.get('loadPlanId');

        if (!this.customOrders.length) {
          loadPlan?.disable({ emitEvent: false });
        } else {
          loadPlan?.enable({ emitEvent: false });
        }
      }
    });
  }

  displayCompany = (key: any): string => {
    return this.clientOptionsCache?.find(x => x.key === key)?.value || '';
  };

  orderForm = new FormGroup({
    addendumId: new FormControl({ value: '', disabled: true }), //! ==> Addendum Number

    addendumDetailId: new FormControl('', Validators.required),
    orderNo: new FormControl({ value: '', disabled: true }),
    transportType: new FormControl('', Validators.required),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    shippingStationId: new FormControl(''),
    destinationStationId: new FormControl(''),
    borderEntryStationId: new FormControl(''),
    borderExitStationId: new FormControl(''),
    shipper: new FormControl('', Validators.required),
    receiver: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    loadPlanId: new FormControl({ value: '', disabled: true }), //! ==> CUSTOMER ORDER
    shippingCountryId: new FormControl(''),
    destinationCountryId: new FormControl(''),
    originCountryId: new FormControl(''),
    hasReturn: new FormControl(true),
    cargoId: new FormControl({ value: '', disabled: true }),
    yds: new FormControl(''),
    podcode: new FormControl({ value: '', disabled: true }),
    warrantDate: new FormControl({ value: '', disabled: true }),
    note: new FormControl(''),
    orderWagons: new FormArray([]),
  })

  ngOnInit() {
    this.clientOptions$ = this.orderForm.get('company')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.commonService.getClients(value)),
      map(res => {
        const data = this.normalizeArray<any>(res.data);
        this.clientOptionsCache = data;
        return data;
      })
    );

    this.orderService.getNewOrdersNumber().subscribe({
      next: (res) => {
        this.newOrderNumber = res.data;
        this.orderForm.patchValue({
          orderNo: this.newOrderNumber,
        });
      }
    });

    this.commonService.getTransportTypes().subscribe({
      next: (res) => {
        this.transportTypes = res.data;
      }
    });

    const transportTypeC = this.orderForm.get('transportType');
    const podcode = this.orderForm.get('podcode');
    const warrantDate = this.orderForm.get('warrantDate');

    transportTypeC?.valueChanges.subscribe((value: any) => {
      const id = Number(value);

      if (id === 2 || id === 4) {
        podcode?.enable({ emitEvent: false });
        warrantDate?.enable({ emitEvent: false });
        podcode?.setValue('');
        warrantDate?.setValue('');
      } else {
        podcode?.disable({ emitEvent: false });
        warrantDate?.disable({ emitEvent: false });
        podcode?.setValue('');
        warrantDate?.setValue('');
      }
    });

    //* ===========================================================
    const loadPlanIdC = this.orderForm.get('loadPlanId');

    loadPlanIdC?.valueChanges.subscribe((val: any) => {
      this.contractService.getLoadPlanById(val).subscribe({
        next: (res) => {
          const data = this.normalizeArray<any>(res.data);
          this.addendumIdOpt = data;

          this.orderForm.patchValue({
            addendumId: data[0]?.addendumId
          });
        }
      })
    })

    // !===========================================================

    const addendumIdC = this.orderForm.get('addendumId');

    addendumIdC?.valueChanges.subscribe((val: any) => {
      this.contractService.getAddendumById(val).subscribe({
        next: (res) => {
          this.addendumDetailOption = res.data.addendumDetails;

          const addendumDetailIdC = this.orderForm.get('addendumDetailId');
          
          this.orderForm.patchValue({
            cargoId: res.data?.cargoId
          });
        }
      })
    })

  }

  addOrderFunc() {
    const formData = this.orderForm.value;
    console.log(formData);

    // this.globalService.addUser(formData).subscribe({
    //   next: (res) => {
    //     // console.log(res);
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
