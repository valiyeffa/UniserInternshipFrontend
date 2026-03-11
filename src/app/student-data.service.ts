import { Injectable } from '@angular/core';
import { Student } from './students/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
    students: Student[] = [
      { id: 2, name: "Liam", surname: "Williams", age: 22, email: "liam@mail.com", subjects: ["Science", "History"] },
      { id: 3, name: "Olivia", surname: "Brown", age: 19, email: "olivia@mail.com", subjects: ["English", "Art"] },
      { id: 4, name: "Noah", surname: "Jones", age: 21, email: "noah@mail.com", subjects: ["Math", "Physics"] },
      { id: 5, name: "Ava", surname: "Garcia", age: 23, email: "ava@mail.com", subjects: ["Biology", "Chemistry"] },
      { id: 6, name: "Ethan", surname: "Miller", age: 20, email: "ethan@mail.com", subjects: ["History"] },
      { id: 7, name: "Sophia", surname: "Davis", age: 22, email: "sophia@mail.com", subjects: ["Math", "Music"] },
      { id: 8, name: "Mason", surname: "Martinez", age: 19, email: "mason@mail.com", subjects: ["PE", "Science"] },
      { id: 9, name: "Isabella", surname: "Wilson", age: 21, email: "isabella@mail.com", subjects: ["Art", "English"] },
      { id: 10, name: "James", surname: "Anderson", age: 20, email: "james@mail.com", subjects: ["Physics", "Math"] },
      { id: 11, name: "Mia", surname: "Taylor", age: 23, email: "mia@mail.com", subjects: ["Chemistry"] },
      { id: 12, name: "Benjamin", surname: "Thomas", age: 22, email: "benjamin@mail.com", subjects: ["History", "English"] },
      { id: 13, name: "Charlotte", surname: "Jackson", age: 19, email: "charlotte@mail.com", subjects: ["Biology", "Art"] },
      { id: 14, name: "Lucas", surname: "White", age: 21, email: "lucas@mail.com", subjects: ["Math", "PE"] },
      { id: 15, name: "Amelia", surname: "Harris", age: 20, email: "amelia@mail.com", subjects: ["Music", "Science"] },
      { id: 16, name: "Henry", surname: "Clark", age: 22, email: "henry@mail.com", subjects: ["Physics"] },
      { id: 17, name: "Harper", surname: "Lewis", age: 19, email: "harper@mail.com", subjects: ["English", "History"] },
      { id: 18, name: "Alexander", surname: "Robinson", age: 23, email: "alexander@mail.com", subjects: ["Chemistry", "Biology"] },
      { id: 19, name: "Evelyn", surname: "Walker", age: 21, email: "evelyn@mail.com", subjects: ["Art", "Music"] },
      { id: 20, name: "Daniel", surname: "Hall", age: 20, email: "daniel@mail.com", subjects: ["Math", "Science"] },
      { id: 21, name: "Scarlett", surname: "Young", age: 22, email: "scarlett@mail.com", subjects: ["PE", "Biology"] },
    ]

    getStudent(): Student[] {
      return this.students;
    }

    addStudent(item: any) {
      this.students.push(item);
    }

    deleteStudent(id: number): void {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) this.students.splice(index, 1);
    }

    updateStudent(updated: Student): void {
    const index = this.students.findIndex(s => s.id === updated.id);
    if (index !== -1) this.students[index] = updated;
    }

  constructor() { }
}
