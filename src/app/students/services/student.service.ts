import { Injectable } from '@angular/core';

// Student modelini interface kimi təyin edirik
export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  subjects: string[];
  course?: string;
  status: 'aktiv' | 'qeyri-aktiv';
  enrollmentDate: string;
}

@Injectable({
  providedIn: 'root'
  // providedIn: 'root' — bu service bütün applikasiya boyunca
  // TEK bir instans (singleton) kimi mövcud olacaq.
  // Yəni hər component eyni service instansını paylaşır.
})
export class StudentService {

  // Tələbələrin siyahısı service daxilində saxlanılır
  private students: Student[] = [
    {
      id: 1,
      name: 'Aysel M.',
      email: 'aysel@school.az',
      age: 20,
      subjects: ['HTML', 'CSS', 'Angular'],
      course: 'Frontend',
      status: 'aktiv',
      enrollmentDate: '01.09.2024'
    },
    {
      id: 2,
      name: 'Tural H.',
      email: 'tural@school.az',
      age: 22,
      subjects: ['Java', 'Spring', 'SQL'],
      course: 'Backend',
      status: 'qeyri-aktiv',
      enrollmentDate: '01.09.2024'
    },
    {
      id: 3,
      name: 'Nigar Ə.',
      email: 'nigar@school.az',
      age: 19,
      subjects: ['Figma', 'Sketch'],
      course: 'UI/UX',
      status: 'aktiv',
      enrollmentDate: '01.09.2024'
    },
    {
      id: 4,
      name: 'Kamran Q.',
      email: 'kamran@school.az',
      age: 21,
      subjects: ['Docker', 'Kubernetes', 'AWS'],
      course: 'DevOps',
      status: 'aktiv',
      enrollmentDate: '01.09.2024'
    },
    {
      id: 5,
      name: 'Leyla R.',
      email: 'leyla@school.az',
      age: 23,
      subjects: ['Swift', 'Kotlin'],
      course: 'Mobile',
      status: 'qeyri-aktiv',
      enrollmentDate: '01.09.2024'
    }
  ];

  // getStudents() metodu  bütün tələbələri qaytarır
  getStudents(): Student[] {
    return this.students;
  }

  //  addStudent methodu yeni tələbə əlavə edir
  addStudent(student: Omit<Student, 'id'>): void {
    const newStudent: Student = {
      ...student,
      id: this.generateId()
    };
    this.students.push(newStudent);
  }

  // ID-yə görə tələbəni silirik deleteStudent metoodu ile
  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
  }

  //  mövcud tələbənin uzerinde yenilikler deyişiklikler edirik
  updateStudent(updatedStudent: Student): void {
    const index = this.students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
  }

  // Köməkçi metod — unikal ID yaradır yeni yaratdiqimiz student üçün
  private generateId(): number {
    return this.students.length > 0
      ? Math.max(...this.students.map(s => s.id)) + 1
      : 1;
  }
}