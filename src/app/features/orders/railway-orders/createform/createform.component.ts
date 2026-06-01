import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GlobalService } from '../../../../services/global.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BooleanPipe } from '../../../../shared/boolean.pipe';
import { AsyncPipe, NgClass } from '@angular/common';
import { OrdersService } from '../../orders.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-createform',
  imports: [ReactiveFormsModule, RouterLink, NgClass, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './createform.component.html',
  styles: ``
})
export class CreateformComponent {
  id!: number;
  private readonly booleanPipe = new BooleanPipe();
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(
    private globalService: GlobalService,
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

  userForm = new FormGroup({
    orderNo: new FormControl(''),
    transportType: new FormControl('', Validators.required),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    shippingStationId: new FormControl(''),
    destinationStationId: new FormControl(''),
    borderEntryStationId: new FormControl(''),
    borderExitStationId: new FormControl(''),
    shipper: new FormControl(''),
    receiver: new FormControl(''),
    loadPlanId: new FormControl(''),
    addendumDetailId: new FormControl(''),
    shippingCountryId: new FormControl(''),
    destinationCountryId: new FormControl(''),
    originCountryId: new FormControl(''),
    hasReturn: new FormControl(true),
    cargoId: new FormControl(''),
    yds: new FormControl(''),
    podcode: new FormControl(''),
    warrantDate: new FormControl(''),
    note: new FormControl(''),
    orderWagons: new FormArray([]),
  })

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getNewOrdersNumber().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
    if (this.id) {
      this.globalService.getUserById(this.id).subscribe({
        next: (res) => {
          this.userForm.patchValue(res.data);

          this.userForm.get('password')?.clearValidators();
          this.userForm.get('password')?.updateValueAndValidity();
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  addUserFunc() {
    const formData = this.userForm.value;
    // const normalizedStatus = this.booleanPipe.transform(formData.status);

    if (this.id) {
      const updatedData = {
        ...formData,
        id: this.id,
        // status: normalizedStatus
      }

      this.globalService.editUser(updatedData).subscribe({
        next: (res) => {
          // console.log(res);
          if (res.status == false) {
            Swal.fire({
              title: "Error",
              text: res.message,
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Success",
              text: "User successfuly updated!",
              icon: "success",
            }).then(() => {
              this.router.navigate(['/modules/settings/users'])
            });
          }
        },
        error: (err) => {
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error"
          });
          console.error(err);
        }
      })
    } else {
      this.globalService.addUser(formData).subscribe({
        next: (res) => {
          // console.log(res);
          if (res.status == false) {
            Swal.fire({
              title: "Error",
              text: res.message,
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Success",
              text: "User successfuly added!",
              icon: "success",
            }).then(() => {
              this.router.navigate(['/modules/settings/users'])
            });
          }
        },
        error: (err) => {
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error"
          });
          console.error(err);
        }
      })
    }
  }
}
