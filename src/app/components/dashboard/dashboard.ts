import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../card/card';
import { ExpenseService } from '../../services/expense';
import { Expense } from '../../models/expense';

/**
 * DashboardComponent - Main dashboard displaying summary cards and transactions
 * Demonstrates:
 * - Component composition (using CardComponent)
 * - @Input and @Output communication
 * - Two-way binding with [(ngModel)]
 * - *ngFor and *ngIf directives
 * - Pipes (currency, date)
 * - Conditional styling with [ngClass]
 * - ngOnInit lifecycle hook
 * - Service injection
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  // Summary card data
  cardData = [
    { title: 'Income', amount: 50000, color: 'green' },
    { title: 'Expenses', amount: 20000, color: 'orange' },
    { title: 'Savings', amount: 30000, color: 'blue' }
  ];

  // Track selected card
  selectedCard: string | null = null;

  // TWO-WAY BINDING: User can type in search input
  searchText: string = '';

  // Transactions list from service
  transactions: Expense[] = [];

  // Filtered transactions based on search
  filteredTransactions: Expense[] = [];

  /**
   * Constructor with dependency injection
   * The service is provided at root level, so it's available here
   */
  constructor(private expenseService: ExpenseService) {}

  /**
   * Lifecycle hook - runs once when component initializes
   * Perfect for data loading and initialization
   */
  ngOnInit(): void {
    console.log('Dashboard loaded');
    
    // Get transactions from service
    this.transactions = this.expenseService.getTransactions();
    this.filteredTransactions = this.transactions;
  }

  /**
   * Handle card click event
   * Called when CardComponent emits cardClicked event
   * @Output() event from child component
   */
  onCardClick(cardTitle: string): void {
    this.selectedCard = cardTitle;
    console.log(`Selected Card: ${cardTitle}`);
  }

  /**
   * Handle search input change
   * TWO-WAY BINDING: [(ngModel)]="searchText" updates this property
   * This method filters transactions based on search text
   */
  onSearchChange(): void {
    if (this.searchText.trim() === '') {
      this.filteredTransactions = this.transactions;
      console.log('Searching for: (cleared)');
    } else {
      console.log(`Searching for: ${this.searchText}`);
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        transaction.category.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  /**
   * Check if transaction amount is high (> 5000)
   * Used for conditional styling with [ngClass]
   * @param amount - The transaction amount to check
   */
  isHighExpense(amount: number): boolean {
    return amount > 5000;
  }
}

