import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.username = user.username;
    }
  }

  logout() {
    this.auth.logout();
  }
}
