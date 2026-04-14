import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { GlobalService } from '../../../../services/global.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-roles-touser',
  imports: [ReactiveFormsModule, MatDialogActions, MatDialogClose],
  templateUrl: './add-roles-touser.component.html',
})
export class AddRolesTouserComponent {
  selectedId !: any;
  userRoles!: any;

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<AddRolesTouserComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {
    this.selectedId = id;
  }
  
  form = new FormGroup({
    userId: new FormControl<number | null>(null),
    roleIds: new FormArray<FormControl<number>>([])
  });

  get roleIds() {
    return this.form.get('roleIds') as FormArray<FormControl<number>>;
  }

  ngOnInit() {
    this.form.patchValue({
      userId: this.id
    });

    this.globalService.getRolesByUserId(this.selectedId).subscribe({
      next: (value) => {
        this.userRoles = value.data;
        // console.log(this.userRoles);
        this.userRoles.forEach((role: any) => {
          if (role.assignStatus) {
            this.roleIds.push(new FormControl(role.roleId))
          }
        });

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  checkedData(event: Event, roleId: any) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.roleIds.push(new FormControl(roleId))
    } else {
      const index = this.roleIds.controls.findIndex(c => c.value === roleId);
      if (index !== -1) {
        this.roleIds.removeAt(index);
      }
    }
  }

  addRolesToUser() {
    if (this.form.invalid) return;
    // console.log(this.form.value);

    this.globalService.addRolesToUser(this.form.value).subscribe({
      next: (res) => {
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
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error"
        });
      }
    })
  }
}
