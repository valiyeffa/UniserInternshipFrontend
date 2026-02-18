import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses = [
    {
      id: 1,
      name: 'Angular 19',
      icon: '🅰️',
      description: 'Müasir Angular ilə professional veb tətbiqlər inkişaf etdirin.',
      teacher: 'Murad müəllim',
      duration: '3 ay',
      level: 'Orta',
      available: true,
      color: 'linear-gradient(90deg, #7c3aed, #6d28d9)'
    },
    {
      id: 2,
      name: 'React & Next.js',
      icon: '⚛️',
      description: 'React ekosistemi ilə dinamik və sürətli interfeyslər yaradın.',
      teacher: 'Elnur müəllim',
      duration: '2 ay',
      level: 'Orta',
      available: false,
      color: 'linear-gradient(90deg, #0ea5e9, #2563eb)'
    },
    {
      id: 3,
      name: 'Node.js & Express',
      icon: '🟢',
      description: 'Server tərəfi proqramlaşdırma və REST API inkişafı.',
      teacher: 'Rauf müəllim',
      duration: '4 ay',
      level: 'Orta',
      available: true,
      color: 'linear-gradient(90deg, #10b981, #059669)'
    },
    {
      id: 4,
      name: 'Python & Django',
      icon: '🐍',
      description: 'Python ilə back-end inkişafı, Django ilə vebsaytın inkişafı',
      teacher: 'Vüsal müəllim',
      duration: '5 ay',
      level: 'Başlanğıc',
      available: true,
      color: 'linear-gradient(90deg, #f59e0b, #d97706)'
    },
    {
      id: 5,
      name: 'Vue.js 3',
      icon: '💚',
      description: 'Vue 3 Composition API ilə reaktiv və yüngül veb tətbiqlər yaradın.',
      teacher: 'Tural müəllim',
      duration: '2 ay',
      level: 'Başlanğıc',
      available: true,
      color: 'linear-gradient(90deg, #42b883, #35495e)'
    },
    {
      id: 6,
      name: 'Flutter & Dart',
      icon: '📱',
      description: 'Tək kod bazası ilə iOS və Android tətbiqləri inkişaf etdirin.',
      teacher: 'Nicat müəllim',
      duration: '4 ay',
      level: 'Başlanğıc',
      available: true,
      color: 'linear-gradient(90deg, #54c5f8, #01579b)'
    },
    {
      id: 7,
      name: 'Java & Spring Boot',
      icon: '☕',
      description: 'Enterprise səviyyəli back-end tətbiqlər və mikroservislər.',
      teacher: 'Kamran müəllim',
      duration: '6 ay',
      level: 'İrəliləmiş',
      available: false,
      color: 'linear-gradient(90deg, #f97316, #b45309)'
    },
    {
      id: 8,
      name: 'Docker & Kubernetes',
      icon: '🐳',
      description: 'Konteynerləşdirmə, orkestrasiya və DevOps prosesləri.',
      teacher: 'Orxan müəllim',
      duration: '3 ay',
      level: 'İrəliləmiş',
      available: true,
      color: 'linear-gradient(90deg, #2496ed, #1e3a5f)'
    },
    {
      id: 9,
      name: 'UI/UX & Figma',
      icon: '🎨',
      description: 'İstifadəçi interfeysi dizaynı və prototipləşdirmə əsasları.',
      teacher: 'Leyla müəllim',
      duration: '2 ay',
      level: 'Başlanğıc',
      available: true,
      color: 'linear-gradient(90deg, #ec4899, #be185d)'
    },
    {
      id: 10,
      name: 'SQL & PostgreSQL',
      icon: '🗄️',
      description: 'Relyasional verilənlər bazası dizaynı, sorğular və optimallaşdırma.',
      teacher: 'Samir müəllim',
      duration: '2 ay',
      level: 'Orta',
      available: false,
      color: 'linear-gradient(90deg, #6366f1, #4338ca)'
    },
  ];

  get availableCount() {
    return this.courses.filter(c => c.available).length;
  }
}