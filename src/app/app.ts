import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';
import { CommonModule } from '@angular/common';

/**
 * App Component - Root component that composes all other components
 * Demonstrates:
 * - Standalone component composition
 * - Component imports
 * - Layout structure with header, sidebar, and dashboard
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Sidebar, Dashboard, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = 'smart-expense-tracker';
}

