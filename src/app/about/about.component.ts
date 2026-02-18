import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  features = [
    { id: 1, icon: '🤖', title: 'AI Avtomatlaşdırma', description: 'Süni intellektimiz təkrarlanan tapşırıqları öz üzərinə götürür ki, siz yaradıcı işlərə fokuslanasınız.', bg: '#ede9fe', isNew: true },
    { id: 2, icon: '📊', title: 'Qabaqcıl Analitika', description: 'Real vaxt rejimini anlayışlar və məlumat vizualizasiyaları ilə məhsuldarlığı izləyin.', bg: '#dbeafe', isNew: false },
    { id: 3, icon: '👥', title: 'Komanda Əməkdaşlığı', description: 'Paylaşılan layihələr və real vaxt yeniləmələri ilə komandanızla problemsiz işləyin.', bg: '#d1fae5', isNew: false },
    { id: 4, icon: '📅', title: 'Ağıllı Planlaşdırma', description: 'Prioritetlər əsasında cədvəlinizi avtomatik optimallaşdırın.', bg: '#fef3c7', isNew: true },
    { id: 5, icon: '🔒', title: 'Korporativ Təhlükəsizlik', description: 'Bank səviyyəli şifrələmə ilə məlumatlarınız həmişə qorunur.', bg: '#fee2e2', isNew: false },
    { id: 6, icon: '🔗', title: '100+ İnteqrasiya', description: 'Qüsursuz iş axını yaratmaq üçün sevdiyiniz bütün alətlərlə əlaqə saxlayın.', bg: '#e0e7ff', isNew: true },
  ];
}