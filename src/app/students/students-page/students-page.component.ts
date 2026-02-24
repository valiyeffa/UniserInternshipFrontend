import { StudentListComponent } from '../student-list/student-list.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-page',
  imports: [StudentListComponent, FormsModule, CommonModule],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css',
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  searchText: string = '';
  //  Search input üçün yaratmisiq

  constructor() {
    console.log('StudentsPage - constructor işlədi');
  }

  ngOnInit() {
    console.log('StudentsPage - ngOnInit işlədi');
  }

  ngOnDestroy() {
    console.log('StudentsPage - ngOnDestroy işlədi');
  }

  students = [
    {
      id: 1,
      name: 'Aysel Məmmədova',
      age: 20,
      major: 'Frontend',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 2,
      name: 'Tural Həsənov',
      age: 22,
      major: 'Backend',
      active: false,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 3,
      name: 'Nigar Əliyeva',
      age: 19,
      major: 'UI/UX',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 4,
      name: 'Kamran Quliyev',
      age: 21,
      major: 'DevOps',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 5,
      name: 'Leyla Rəhimova',
      age: 23,
      major: 'Mobile',
      active: false,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 6,
      name: 'Əli Babayev',
      age: 20,
      major: 'Backend',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 7,
      name: 'Günel Hüseynova',
      age: 18,
      major: 'Frontend',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 8,
      name: 'Rauf Nəsirov',
      age: 24,
      major: 'DevOps',
      active: false,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 9,
      name: 'Sevinc Kazımova',
      age: 21,
      major: 'UI/UX',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 10,
      name: 'Orxan Məlikli',
      age: 22,
      major: 'Mobile',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 11,
      name: 'Zəhra Sultanova',
      age: 19,
      major: 'Frontend',
      active: false,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 12,
      name: 'Murad İsmayılov',
      age: 25,
      major: 'Backend',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 13,
      name: 'Fidan Əsgərova',
      age: 20,
      major: 'UI/UX',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 14,
      name: 'Elnur Cəfərov',
      age: 23,
      major: 'DevOps',
      active: false,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 15,
      name: 'Nərmin Hacıyeva',
      age: 18,
      major: 'Mobile',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 16,
      name: 'Vüsal Şıxlinski',
      age: 22,
      major: 'Frontend',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 17,
      name: 'Könül Abbasova',
      age: 21,
      major: 'Backend',
      active: false,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 18,
      name: 'Samir Rüstəmov',
      age: 24,
      major: 'DevOps',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 19,
      name: 'Aytən Qasımova',
      age: 20,
      major: 'UI/UX',
      active: true,
      enrollDate: new Date('2024-09-01'),
    },
    {
      id: 20,
      name: 'Bəhruz Hümbətov',
      age: 23,
      major: 'Mobile',
      active: false,
      enrollDate: new Date('2024-09-01'),
    },
  ];

  get activeCount() {
    return this.students.filter((s) => s.active).length;
    // akdiv olanlari bir arraya push edir onunn uzunluqunu return edir
  }

  get filteredStudents() {
    return this.students.filter((s) =>
      s.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
    //  Search inputuna görə siyahını filter edirik
  }

  newStudentName: string = '';
  newStudentAge: number | null = null;
  newStudentMajor: string = '';
  newStudentActive: boolean | null = null;
  showForm: boolean = false;

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addStudent(form: any) {
  if (form.invalid) return;

  const maxId = Math.max(...this.students.map((s) => s.id));
  this.students.push({
    id: maxId + 1,
    name: this.newStudentName,
    age: this.newStudentAge!,
    major: this.newStudentMajor,
    active: this.newStudentActive!,
    enrollDate: new Date(),
  });

  this.newStudentName = '';
  this.newStudentAge = null;
  this.newStudentMajor = '';
  this.newStudentActive = null;
  form.resetForm();
  this.showForm = false;
}

  editingStudent: any = null;
  //  redaktə olunan studenti saxlayır

  editStudent(student: any) {
    this.editingStudent = { ...student };
    //  studentin kopyasını alırıq, orijinalı dəyişmir
    this.showForm = false;
  }

  saveEdit(form: any) {
    if (form.invalid) return;
    const index = this.students.findIndex(
      (s) => s.id === this.editingStudent.id,
    );
    this.students[index] = { ...this.editingStudent };
    //  massivdə həmin studenti yenisi ilə əvəz edir
    this.editingStudent = null;
  }

  cancelEdit() {
    this.editingStudent = null;
  }

  deleteStudent(id: number) {
    this.students = this.students.filter((s) => s.id !== id);
    // delete funksiyasi silmeyi isdeiyimiz elemntin idsiyle filtir edib tapir
    //  Həmin id-li studenti massivdən çıxarır
  }
}
