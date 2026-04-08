import { NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from '../../../../services/global.service';
import Swal from 'sweetalert2';
import { BooleanPipe } from '../../../../shared/boolean.pipe';

@Component({
  selector: 'app-roles-form',
  imports: [MatDialogModule, MatButtonModule, NgClass, ReactiveFormsModule],
  templateUrl: './roles-form.component.html',
  styles: ``
})
export class RolesFormComponent {
  newRoleCode!: number;
  selectedRole: any;
  private readonly booleanPipe = new BooleanPipe();

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<RolesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedRole = data;
  }

  rolesForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl(true, Validators.required),
  })

  ngOnInit() {
    if (this.selectedRole) {
      this.rolesForm.patchValue({
        name: this.selectedRole.name,
        status: this.booleanPipe.transform(this.selectedRole.status)
      });
    } else {
      this.globalService.getNewRoleCode().subscribe({
        next: (res) => {
          this.newRoleCode = res.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  
  addRoleFunc() {
    const formData = this.rolesForm.value;
    const normalizedStatus = this.booleanPipe.transform(formData.status);

    if (this.selectedRole) {
      const updateForm = {
        id: this.selectedRole.id,
        code: this.selectedRole.code,
        ...formData,
        status: normalizedStatus
      };

      this.globalService.addOrUpdateRole(updateForm).subscribe({
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
              text: "Role successfully updated!",
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
      });
    } else {
      const newForm = {
        code: this.newRoleCode.toString(),
        ...formData,
        status: normalizedStatus
      };
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
              text: "Role successfully added!",
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
      });
    }
  }

}
