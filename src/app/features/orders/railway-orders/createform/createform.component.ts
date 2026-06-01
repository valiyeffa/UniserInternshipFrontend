import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { OrdersService } from '../../orders.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-createform',
  imports: [ReactiveFormsModule, RouterLink, NgClass, MatFormFieldModule, MatInputModule, MatAutocompleteModule, AsyncPipe],
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

  myControl = new FormControl('');
  companyControl = new FormControl('', Validators.required);
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(
    private commonService: CommonService,
    private orderService: OrdersService,
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

  displayCompany(company: any): string {
    if (!company) {
      return '';
    }
    if (typeof company === 'string') {
      return company;
    }
    return company.value ?? '';
  }

  orderForm = new FormGroup({
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
    company: this.companyControl,
    loadPlanId: new FormControl(''),
    addendumDetailId: new FormControl('', Validators.required),
    shippingCountryId: new FormControl(''),
    destinationCountryId: new FormControl(''),
    originCountryId: new FormControl(''),
    hasReturn: new FormControl(true),
    cargoId: new FormControl(''),
    yds: new FormControl(''),
    podcode: new FormControl({ value: '', disabled: true }),
    warrantDate: new FormControl({ value: '', disabled: true }),
    note: new FormControl(''),
    orderWagons: new FormArray([]),
  })

  ngOnInit() {
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

    this.companyControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((value: string | null) => {
      this.fetchClients(value || '');
    });

    this.fetchClients('');

    const transportTypeC = this.orderForm.get('transportType');
    const podcode = this.orderForm.get('podcode');
    const warrantDate = this.orderForm.get('warrantDate');

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

  private fetchClients(filter: string) {
    this.commonService.getClients(filter).subscribe({
      next: (res) => {
        this.companies = res.data;

      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }

  addOrderFunc() {
    const formData = this.orderForm.value;

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
