import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from '../../../../services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-form',
  imports: [MatDialogModule, MatButtonModule, NgClass, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './roles-form.component.html',
  styles: ``
})
export class RolesFormComponent {
  newRoleCode!: number;

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<RolesFormComponent>
  ) { }

  rolesForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl(true, Validators.required),
  })

  ngOnInit() {
    this.globalService.getNewRoleCode().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.newRoleCode = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  addRoleFunc() {
    const formData = this.rolesForm.value;

    // if (this.id) {
    const newForm = {
      code: this.newRoleCode.toString(),
      ...formData
    }

    this.globalService.addOrUpdateRole(newForm).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == false) {
          Swal.fire({
            title: "Error",
            text: res.message,
            icon: "error"
          });
        } else {
          Swal.fire({
            title: "Success",
            text: "Role successfuly added!",
            icon: "success",
          }).then(() => {
            this.dialogRef.close(true);
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

    // } else {
    //   this.globalService.addUser(formData).subscribe({
    //     next: (res) => {
    //       // console.log(res);
    //       if (res.status == false) {
    //         Swal.fire({
    //           title: "Error",
    //           text: res.message,
    //           icon: "error"
    //         });
    //       } else {
    //         Swal.fire({
    //           title: "Success",
    //           text: "User successfuly added!",
    //           icon: "success",
    //         }).then(() => {
    //           this.rolesForm.reset();
    //         });
    //       }
    //     },
    //     error: (err) => {
    //       Swal.fire({
    //         title: "Error",
    //         text: "Something went wrong!",
    //         icon: "error"
    //       });
    //       console.error(err);
    //     }
    //   })
    // }

  }
}
