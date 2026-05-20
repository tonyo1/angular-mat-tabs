import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatTabNav, MatTabLink } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';   // ← Add this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatTabNav,
    MatTabLink,
    CommonModule        // ← Add this line
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  navLinks: { label: string; link: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.navLinks = this.router.config
      .filter(route => route.data?.['label'])
      .map(route => ({
        label: route.data!['label'],
        link: `/${route.path || ''}`
      }));
  }
}