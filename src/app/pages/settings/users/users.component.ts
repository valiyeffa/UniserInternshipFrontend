import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GlobalService, User, Role } from '../../../core/services/global.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  isSaving = false;
  rolesLoading = false;
  errorMessage = '';
  showModal = false;
  showRolesModal = false;
  isEditing = false;
  selectedUser: User | null = null;
  userForm: FormGroup;
  showOperationsMenu = false;

  // All roles with assignStatus merged from API
  allRolesWithStatus: Role[] = [];

  currentPage = 1;
  pageSize = 15;
  Math = Math;

  constructor(private globalService: GlobalService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      finCode: [''],
      gender: [true],
      username: ['', Validators.required],
      password: [''],
      email: [''],
      phone1: [''],
      phone2: [''],
      status: [true]
    });
  }

  ngOnInit() {
    this.loadUsers();
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
    return Math.ceil(this.users.length / this.pageSize) || 1;
  }

  get pagedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.users.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onPageSizeChange() {
    this.currentPage = 1;
  }

  selectUser(user: User) {
    this.selectedUser = this.selectedUser?.id === user.id ? null : user;
  }

  loadUsers() {
    this.isLoading = true;
    this.errorMessage = '';
    this.globalService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users || [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'İstifadəçilər yüklənərkən xəta baş verdi!';
        this.isLoading = false;
      }
    });
  }

  openAddModal() {
    this.showOperationsMenu = false;
    this.isEditing = false;
    this.errorMessage = '';
    this.userForm.reset({ gender: true, status: true });
    this.userForm.get('password')?.setValidators([Validators.required]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
  }

  openEditModalFromSelection() {
    this.showOperationsMenu = false;
    if (!this.selectedUser) return;
    this.isEditing = true;
    this.errorMessage = '';
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.userForm.patchValue({
      firstName: this.selectedUser.firstName,
      lastName: this.selectedUser.lastName,
      finCode: this.selectedUser.finCode,
      gender: this.selectedUser.gender,
      username: this.selectedUser.username,
      email: this.selectedUser.email,
      phone1: this.selectedUser.phone1,
      phone2: this.selectedUser.phone2,
      status: this.selectedUser.status
    });
    this.showModal = true;
  }

  openRolesModal() {
    this.showOperationsMenu = false;
    if (!this.selectedUser) return;
    this.allRolesWithStatus = [];
    this.errorMessage = '';
    this.rolesLoading = true;
    this.showRolesModal = true;

    // Load ALL roles + user's assigned roles simultaneously
    forkJoin({
      allRoles: this.globalService.getAllRoles(),
      userRoles: this.globalService.getUserRolesById(this.selectedUser.id)
    }).subscribe({
      next: ({ allRoles, userRoles }) => {
        // userRoles contains roles with assignStatus from API
        // Build a set of assigned role IDs
        const assignedIds = new Set(
          (userRoles || [])
            .filter(r => r.assignStatus)
            .map(r => r.id)
        );

        // Map all roles and mark which are assigned
        this.allRolesWithStatus = (allRoles || []).map(role => ({
          ...role,
          assignStatus: assignedIds.has(role.id)
        }));

        this.rolesLoading = false;
      },
      error: () => {
        this.errorMessage = 'Rollar yüklənərkən xəta baş verdi!';
        this.rolesLoading = false;
      }
    });
  }

  toggleRole(role: Role) {
    role.assignStatus = !role.assignStatus;
  }

  saveRoles() {
    if (!this.selectedUser) return;
    this.isSaving = true;
    const selectedRoleIds = this.allRolesWithStatus
      .filter(r => r.assignStatus)
      .map(r => r.id);

    this.globalService.addRolesToUser({
      userId: this.selectedUser.id,
      roleIds: selectedRoleIds
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.closeRolesModal();
      },
      error: () => {
        this.errorMessage = 'Rollar saxlanarkən xəta baş verdi!';
        this.isSaving = false;
      }
    });
  }

  closeRolesModal() {
    this.showRolesModal = false;
    this.allRolesWithStatus = [];
    this.errorMessage = '';
    this.isSaving = false;
  }

  closeModal() {
    this.showModal = false;
    this.userForm.reset();
    this.errorMessage = '';
    this.isSaving = false;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    const v = this.userForm.value;

    if (this.isEditing && this.selectedUser) {
      this.globalService.updateUser({
        id: this.selectedUser.id,
        firstName: v.firstName,
        lastName: v.lastName,
        finCode: v.finCode || '',
        gender: v.gender,
        username: v.username,
        email: v.email || '',
        phone1: v.phone1 || '',
        phone2: v.phone2 || '',
        status: v.status
      }).subscribe({
        next: () => { this.isSaving = false; this.closeModal(); this.loadUsers(); },
        error: () => { this.errorMessage = 'Yenilənərkən xəta baş verdi!'; this.isSaving = false; }
      });
    } else {
      this.globalService.addUser({
        id: 0,
        firstName: v.firstName,
        lastName: v.lastName,
        finCode: v.finCode || '',
        gender: v.gender,
        username: v.username,
        password: v.password,
        email: v.email || '',
        phone1: v.phone1 || '',
        phone2: v.phone2 || ''
      }).subscribe({
        next: () => { this.isSaving = false; this.closeModal(); this.loadUsers(); },
        error: () => { this.errorMessage = 'Əlavə edilərkən xəta baş verdi!'; this.isSaving = false; }
      });
    }
  }

  resetPassword() {
    this.showOperationsMenu = false;
    // Implement reset password logic here
  }

  deleteSelected() {
    this.showOperationsMenu = false;
    if (!this.selectedUser) return;
    if (!confirm(`"${this.selectedUser.firstName} ${this.selectedUser.lastName}" istifadəçisini silmək istədiyinizə əminsiniz?`)) return;
    this.globalService.deleteUser(this.selectedUser.id).subscribe({
      next: () => { this.selectedUser = null; this.loadUsers(); },
      error: () => { this.errorMessage = 'Silinərkən xəta baş verdi!'; }
    });
  }
}