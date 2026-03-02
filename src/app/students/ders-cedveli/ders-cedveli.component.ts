import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ders-cedveli',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ders-cedveli.component.html',
  styleUrl: './ders-cedveli.component.css'
})
export class DersCedveliComponent {
  lessons = [
    { day: 'Bazar ertəsi', time: '09:00 - 10:30', subject: 'Angular', teacher: 'Əli Məmmədov', room: '101' },
    { day: 'Bazar ertəsi', time: '11:00 - 12:30', subject: 'TypeScript', teacher: 'Nigar Əliyeva', room: '102' },
    { day: 'Çərşənbə', time: '09:00 - 10:30', subject: 'HTML/CSS', teacher: 'Tural Həsənov', room: '103' },
    { day: 'Çərşənbə', time: '11:00 - 12:30', subject: 'JavaScript', teacher: 'Leyla Rəhimova', room: '101' },
    { day: 'Cümə', time: '09:00 - 10:30', subject: 'Git', teacher: 'Kamran Quliyev', room: '104' },
  ];
}