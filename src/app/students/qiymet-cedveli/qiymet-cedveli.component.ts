import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qiymet-cedveli',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qiymet-cedveli.component.html',
  styleUrl: './qiymet-cedveli.component.css'
})
export class QiymetCedveliComponent {
  grades = [
    { subject: 'Angular', teacher: 'Əli Məmmədov', grade: 85 },
    { subject: 'TypeScript', teacher: 'Nigar Əliyeva', grade: 72 },
    { subject: 'HTML/CSS', teacher: 'Tural Həsənov', grade: 90 },
    { subject: 'JavaScript', teacher: 'Leyla Rəhimova', grade: 45 },
    { subject: 'Git', teacher: 'Kamran Quliyev', grade: 60 },
  ];
}