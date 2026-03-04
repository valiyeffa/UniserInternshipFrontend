import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards = [
    {
      id: 1,
      icon: '🎯',
      title: 'Hədəfə Yönəlmiş',
      desc: 'Hər kurs real iş həyatında lazım olan bacarıqlar üzərindədir.',
      bg: '#ede9fe'
    },
    {
      id: 2,
      icon: '👨‍🏫',
      title: 'Peşəkar Müəllimlər',
      desc: 'Sahəsinin mütəxəssislərindən bilavasitə öyrənin.',
      bg: '#e0e7ff'
    },
    {
      id: 3,
      icon: '🏆',
      title: 'Sertifikat',
      desc: 'Kursu bitirdikdən sonra beynəlxalq etibarlı sertifikat alın.',
      bg: '#d1fae5'
    }
  ];




}