import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students = [
    { id: 1, name: 'Aysel Məmmədova', age: 20, major: 'Frontend', active: true, enrollDate: new Date('2024-09-01') },
    { id: 2, name: 'Tural Həsənov', age: 22, major: 'Backend', active: false, enrollDate: new Date('2024-09-01') },
    { id: 3, name: 'Nigar Əliyeva', age: 19, major: 'UI/UX', active: true, enrollDate: new Date('2024-09-01') },
    { id: 4, name: 'Kamran Quliyev', age: 21, major: 'DevOps', active: true, enrollDate: new Date('2024-09-01') },
    { id: 5, name: 'Leyla Rəhimova', age: 23, major: 'Mobile', active: false, enrollDate: new Date('2024-09-01') },
  ];

  getStudents() {
    return this.students;
  }

  addStudent(student: any) {
    const maxId = Math.max(...this.students.map(s => s.id));
    this.students.push({ ...student, id: maxId + 1, enrollDate: new Date() });
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
  }

  updateStudent(updated: any) {
    const index = this.students.findIndex(s => s.id === updated.id);
    this.students[index] = { ...updated };
  }
}