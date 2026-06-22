import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * HeaderComponent - Displays the application header
 * Demonstrates:
 * - Interpolation {{ }}
 * - Date pipe | date
 * - Property binding [property]
 * - Component lifecycle (OnInit)
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  // App branding - displayed via interpolation
  appLogo: string = '💰';
  appTitle: string = 'Smart Expense Tracker';
  userName: string = 'Rilwan Haq';
  
  // Current date - will be displayed with date pipe
  currentDate: Date = new Date();

  constructor() {}

  /**
   * Lifecycle hook - runs once when component is initialized
   * Perfect for initial setup and data loading
   */
  ngOnInit(): void {
    console.log('HeaderComponent initialized');
  }
}

