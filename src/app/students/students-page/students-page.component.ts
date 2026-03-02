import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { StudentListComponent } from '../student-list/student-list.component';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, StudentListComponent],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css'
})
export class StudentsPageComponent implements OnInit {
  students: any[] = [];
  searchText: string = '';
  showForm: boolean = false;
  editingStudent: any = null;
  newStudentName: string = '';
  newStudentAge: number | null = null;
  newStudentMajor: string = '';
  newStudentActive: boolean | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.students = this.studentService.getStudents();
  }

  get activeCount() {
    return this.students.filter(s => s.active).length;
  }

  get filteredStudents() {
    return this.students.filter(s =>
      s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addStudent(form: any) {
    if (form.invalid) return;
    this.studentService.addStudent({
      name: this.newStudentName,
      age: this.newStudentAge,
      major: this.newStudentMajor,
      active: this.newStudentActive
    });
    this.students = this.studentService.getStudents();
    this.newStudentName = '';
    this.newStudentAge = null;
    this.newStudentMajor = '';
    this.newStudentActive = null;
    form.resetForm();
    this.showForm = false;
  }

  editStudent(student: any) {
    this.editingStudent = { ...student };
    this.showForm = false;
  }

  saveEdit(form: any) {
    if (form.invalid) return;
    this.studentService.updateStudent(this.editingStudent);
    this.students = this.studentService.getStudents();
    this.editingStudent = null;
  }

  cancelEdit() {
    this.editingStudent = null;
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.students = this.studentService.getStudents();
  }
}