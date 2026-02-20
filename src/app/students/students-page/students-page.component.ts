import { Component } from '@angular/core';
import { StudentListComponent } from '../student-list/student-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-page',
  imports: [StudentListComponent, FormsModule],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.css'
})
export class StudentsPageComponent {

  newStudentName: string = '';
  //  Add input üçün yaratmisiq 

  searchText: string = '';
  //  Search input üçün yaratmisiq

  students = [
    { id: 1,  name: 'Aysel Məmmədova',  age: 20, major: 'Frontend', active: true  },
    { id: 2,  name: 'Tural Həsənov',    age: 22, major: 'Backend',  active: false },
    { id: 3,  name: 'Nigar Əliyeva',    age: 19, major: 'UI/UX',    active: true  },
    { id: 4,  name: 'Kamran Quliyev',   age: 21, major: 'DevOps',   active: true  },
    { id: 5,  name: 'Leyla Rəhimova',   age: 23, major: 'Mobile',   active: false },
    { id: 6,  name: 'Əli Babayev',      age: 20, major: 'Backend',  active: true  },
    { id: 7,  name: 'Günel Hüseynova',  age: 18, major: 'Frontend', active: true  },
    { id: 8,  name: 'Rauf Nəsirov',     age: 24, major: 'DevOps',   active: false },
    { id: 9,  name: 'Sevinc Kazımova',  age: 21, major: 'UI/UX',    active: true  },
    { id: 10, name: 'Orxan Məlikli',    age: 22, major: 'Mobile',   active: true  },
    { id: 11, name: 'Zəhra Sultanova',  age: 19, major: 'Frontend', active: false },
    { id: 12, name: 'Murad İsmayılov',  age: 25, major: 'Backend',  active: true  },
    { id: 13, name: 'Fidan Əsgərova',   age: 20, major: 'UI/UX',    active: true  },
    { id: 14, name: 'Elnur Cəfərov',    age: 23, major: 'DevOps',   active: false },
    { id: 15, name: 'Nərmin Hacıyeva',  age: 18, major: 'Mobile',   active: true  },
    { id: 16, name: 'Vüsal Şıxlinski',  age: 22, major: 'Frontend', active: true  },
    { id: 17, name: 'Könül Abbasova',   age: 21, major: 'Backend',  active: false },
    { id: 18, name: 'Samir Rüstəmov',   age: 24, major: 'DevOps',   active: true  },
    { id: 19, name: 'Aytən Qasımova',   age: 20, major: 'UI/UX',    active: true  },
    { id: 20, name: 'Bəhruz Hümbətov',  age: 23, major: 'Mobile',   active: false },
  ];

  get activeCount() {
    return this.students.filter(s => s.active).length;
  }

  get filteredStudents() {
    return this.students.filter(s =>
      s.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    //  Search inputuna görə siyahını filter edirik 
  }

 addStudent() {
  if (this.newStudentName.trim() === '') return;

  const maxId = Math.max(...this.students.map(s => s.id));
  //  Massivdəki ən böyük id-ni tapır yeni isciye id elave etmek ucun

  this.students.push({
    id: maxId + 1,
    //  Həmişə ən böyük id-dən 1 artıq verir 
    name: this.newStudentName,
    age: 18,
    major: 'Frontend',
    active: true
  });

  this.newStudentName = '';
}

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
    // delete funksiyasi silmeyi isdeiyimiz elemntin idsiyle filtir edib tapir
    //  Həmin id-li studenti massivdən çıxarır 
  }
}