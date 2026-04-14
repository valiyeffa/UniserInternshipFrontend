import { Component, Inject } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-menus',
  imports: [MatDialogActions, MatDialogClose, ReactiveFormsModule],
  templateUrl: './role-menus.component.html',
  styles: ``
})
export class RoleMenusComponent {
  selectedId !: any;
  roleMenus!: any;

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<RoleMenusComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {
    this.selectedId = id;
  }

  form = new FormGroup({
    roleId: new FormControl<number | null>(null),
    menuIds: new FormArray<FormControl<number>>([])
  });

  get menuIds() {
    return this.form.get('menuIds') as FormArray<FormControl<number>>;
  }

  ngOnInit() {
    this.form.patchValue({
      roleId: this.id
    });

    this.globalService.getRoleMenusByRoleId(this.selectedId).subscribe({
      next: (res) => {
        this.roleMenus = res.data;
        // console.log(this.roleMenus);
        this.roleMenus.forEach((role: any) => {
          
          if (role.assignStatus) {
            this.menuIds.push(new FormControl(role.menuId))
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  checkedData(event: Event, menuId: any) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.menuIds.push(new FormControl(menuId));
    } else {
      const index = this.menuIds.controls.findIndex(c => c.value === menuId);
      if (index !== -1) {
        this.menuIds.removeAt(index);
      }
    }
  }

  addRolesToUser() {
    if (this.form.invalid) return;

    this.globalService.saveRoleMenus(this.form.value).subscribe({
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
