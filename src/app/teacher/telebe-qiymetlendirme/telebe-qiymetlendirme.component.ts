import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-telebe-qiymetlendirme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './telebe-qiymetlendirme.component.html',
  styleUrl: './telebe-qiymetlendirme.component.css'
})
export class TelebeQiymetlendirmeComponent {
  selectedGroup = 'all';

  students = [
    { name: 'Aysel Məmmədova', group: 'FE-01', angular: 85, typescript: 90, javascript: 78, htmlcss: 92 },
    { name: 'Tural Həsənov', group: 'FE-01', angular: 45, typescript: 55, javascript: 60, htmlcss: 50 },
    { name: 'Nigar Əliyeva', group: 'FE-02', angular: 92, typescript: 88, javascript: 95, htmlcss: 90 },
    { name: 'Kamran Quliyev', group: 'FE-02', angular: 70, typescript: 65, javascript: 72, htmlcss: 68 },
    { name: 'Leyla Rəhimova', group: 'FE-03', angular: 40, typescript: 48, javascript: 45, htmlcss: 52 },
    { name: 'Əli Babayev', group: 'FE-01', angular: 88, typescript: 82, javascript: 90, htmlcss: 85 },
    { name: 'Günəl Hüseynova', group: 'FE-02', angular: 76, typescript: 70, javascript: 80, htmlcss: 74 },
    { name: 'Rauf Nəsirov', group: 'FE-03', angular: 55, typescript: 60, javascript: 58, htmlcss: 62 },
  ];

  get filteredStudents() {
    if (this.selectedGroup === 'all') return this.students;
    return this.students.filter(s => s.group === this.selectedGroup);
  }

  getAvg(student: any): number {
    return Math.round((student.angular + student.typescript + student.javascript + student.htmlcss) / 4);
  }

  get avgGrade(): number {
    const avgs = this.filteredStudents.map(s => this.getAvg(s));
    return Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length);
  }

  get passCount(): number {
    return this.filteredStudents.filter(s => this.getAvg(s) >= 51).length;
  }

  get failCount(): number {
    return this.filteredStudents.filter(s => this.getAvg(s) < 51).length;
  }

  getGradeClass(grade: number): string {
    if (grade >= 81) return 'grade excellent';
    if (grade >= 61) return 'grade good';
    if (grade >= 51) return 'grade average';
    return 'grade fail';
  }
}