import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SidebarComponent - Displays navigation menu
 * Demonstrates:
 * - Array of objects storage
 * - *ngFor loop directive
 * - Event binding (click)
 * - Conditional styling
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  // Menu items stored in array - rendered using *ngFor
  menuItems = [
    { id: 1, name: 'Dashboard', icon: '📊' },
    { id: 2, name: 'Expenses', icon: '💸' },
    { id: 3, name: 'Reports', icon: '📈' },
    { id: 4, name: 'Settings', icon: '⚙️' }
  ];

  // Track active menu item
  activeMenuId: number = 1;

  constructor() {}

  /**
   * Lifecycle hook - runs when component initializes
   */
  ngOnInit(): void {
    console.log('SidebarComponent initialized');
  }

  /**
   * Handle menu item click
   * EVENT BINDING: (click)="onMenuClick(item)" listens to click event
   * @param menuItem - The clicked menu item
   */
  onMenuClick(menuItem: any): void {
    this.activeMenuId = menuItem.id;
    console.log(`Menu item clicked: ${menuItem.name}`);
  }
}

