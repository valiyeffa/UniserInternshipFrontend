import { Component, SimpleChanges } from '@angular/core';
import { StudentListComponent } from '../student-list/student-list.component';
import { Student } from './student.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe, NgIf, NgClass} from '@angular/common';
import { fullNameConverter } from './fullnameConverter.pipe';

@Component({
  selector: 'app-students',
  imports: [StudentListComponent, FormsModule, NgClass, DatePipe, fullNameConverter, NgIf],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})

export class StudentsComponent {
  students: Student[] = [
    { id: 1, name: "Emma", surname: "Johnson", age: 20 },
    { id: 2, name: "Liam", surname: "Williams", age: 22 },
    { id: 3, name: "Olivia", surname: "Brown", age: 19 },
    { id: 4, name: "Noah", surname: "Davis", age: 21 },
    { id: 5, name: "Ava", surname: "Miller", age: 23 },
    { id: 6, name: "Sophia", surname: "Wilson", age: 20 },
    { id: 7, name: "Mason", surname: "Moore", age: 24 },
    { id: 8, name: "Isabella", surname: "Taylor", age: 18 },
    { id: 9, name: "Ethan", surname: "Anderson", age: 22 },
    { id: 10, name: "Mia", surname: "Thomas", age: 21 },
    { id: 11, name: "James", surname: "Jackson", age: 19 },
    { id: 12, name: "Charlotte", surname: "White", age: 23 },
    { id: 13, name: "Benjamin", surname: "Harris", age: 20 },
    { id: 14, name: "Amelia", surname: "Martin", age: 22 },
    { id: 15, name: "Lucas", surname: "Garcia", age: 21 },
  ]

  deleteStudent(id: number) {
    this.students.splice(this.students.findIndex(item => item.id === id), 1);
  }

  filterName = '';

  get filteredStudents(): Student[] {
    return this.students.filter(s => s.name.toLowerCase().includes(this.filterName.toLowerCase()));
  }

  newName = '';
  newSurname = '';
  newAge = '';

  onSubmit(form: NgForm) {
    if(form.valid) {
      const newId = Math.max(...this.students.map(s => s.id)) + 1;

      this.students = [...this.students, {
            id: newId,
            name: this.newName.trim(),
            surname: this.newSurname.trim(),
            age: Number(this.newAge)
      }];

      form.reset();
    }
  }

  tarix: string = Date();
  myName: string = 'Lala Alimova';

  ngOnInit() {
    console.log("Students page component initialized");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes detected in students page: ', changes);
  }

  ngOnDestroy() {
    console.log('Students page component destroyed');
  }
}
