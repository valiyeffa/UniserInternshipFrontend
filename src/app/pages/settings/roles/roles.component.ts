import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GlobalService, Role, RoleMenu } from '../../../core/services/global.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  roleMenus: RoleMenu[] = [];
  isLoading = true;
  isSaving = false;
  menusLoading = false;
  errorMessage = '';
  showModal = false;
  showMenusModal = false;
  isEditing = false;
  selectedRole: Role | null = null;
  roleForm: FormGroup;
  showOperationsMenu = false;

  currentPage = 1;
  pageSize = 15;
  Math = Math;

  constructor(private globalService: GlobalService, private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      code: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      status: [true]
    });
  }

  ngOnInit() {
    this.loadRoles();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.showOperationsMenu = false;
  }

  toggleOperationsMenu(event: Event) {
    event.stopPropagation();
    this.showOperationsMenu = !this.showOperationsMenu;
  }

  get totalPages(): number {
    return Math.ceil(this.roles.length / this.pageSize) || 1;
  }

  get pagedRoles(): Role[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.roles.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onPageSizeChange() {
    this.currentPage = 1;
  }

  selectRole(role: Role) {
    this.selectedRole = this.selectedRole?.id === role.id ? null : role;
  }

  loadRoles() {
    this.isLoading = true;
    this.errorMessage = '';
    this.globalService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles || [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Rollar yüklənərkən xəta baş verdi!';
        this.isLoading = false;
      }
    });
  }

  openAddModal() {
    this.showOperationsMenu = false;
    this.isEditing = false;
    this.errorMessage = '';
    this.roleForm.reset({ status: true });
    this.globalService.getNewRoleCode().subscribe({
      next: (code) => { this.roleForm.patchValue({ code }); },
      error: () => {}
    });
    this.showModal = true;
  }

  openEditModalFromSelection() {
    this.showOperationsMenu = false;
    if (!this.selectedRole) return;
    this.isEditing = true;
    this.errorMessage = '';
    this.roleForm.patchValue({
      code: this.selectedRole.code,
      name: this.selectedRole.value,  // role.value (from API list) goes into form "name" field
      status: this.selectedRole.status
    });
    this.showModal = true;
  }

  openMenusModal() {
    this.showOperationsMenu = false;
    if (!this.selectedRole) return;
    this.roleMenus = [];
    this.errorMessage = '';
    this.menusLoading = true;
    this.showMenusModal = true;
    this.globalService.getRoleMenusByRoleId(this.selectedRole.id).subscribe({
      next: (menus) => {
        this.roleMenus = menus || [];
        this.menusLoading = false;
      },
      error: () => {
        this.errorMessage = 'Menyular yüklənərkən xəta baş verdi!';
        this.menusLoading = false;
      }
    });
  }

  toggleMenu(menu: RoleMenu) {
    menu.assignStatus = !menu.assignStatus;
  }

  saveRoleMenus() {
    if (!this.selectedRole) return;
    this.isSaving = true;
    const selectedMenuIds = this.roleMenus.filter(m => m.assignStatus).map(m => m.id);
    this.globalService.saveRoleMenus({ roleId: this.selectedRole.id, menuIds: selectedMenuIds }).subscribe({
      next: () => { this.isSaving = false; this.closeMenusModal(); },
      error: () => { this.errorMessage = 'Menyu icazələri saxlanarkən xəta baş verdi!'; this.isSaving = false; }
    });
  }

  closeMenusModal() {
    this.showMenusModal = false;
    this.roleMenus = [];
    this.menusLoading = false;
    this.isSaving = false;
    this.errorMessage = '';
  }

  closeModal() {
    this.showModal = false;
    this.roleForm.reset();
    this.errorMessage = '';
    this.isSaving = false;
  }

  onSubmit() {
    if (this.roleForm.invalid) {
      this.roleForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    const raw = this.roleForm.getRawValue();

    // API body: { id, name, code, status }
    const data = {
      id: this.isEditing && this.selectedRole ? this.selectedRole.id : 0,
      name: raw.name,
      code: raw.code || '',
      status: raw.status ?? true
    };

    this.globalService.addOrUpdateRole(data).subscribe({
      next: () => { this.isSaving = false; this.closeModal(); this.loadRoles(); },
      error: () => {
        this.errorMessage = this.isEditing ? 'Yenilənərkən xəta baş verdi!' : 'Əlavə edilərkən xəta baş verdi!';
        this.isSaving = false;
      }
    });
  }
}