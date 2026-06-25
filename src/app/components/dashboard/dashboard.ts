import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Card } from '../card/card';
import { ExpenseService } from '../../services/expense';
import { Expense } from '../../models/expense';
import { SummaryCard } from '../summary-card/summary-card';
import { RecentTransactions } from '../recent-transactions/recent-transactions';
import { Profile } from '../profile/profile';
import { Notification } from '../notification/notification';

/**
 * DashboardComponent - SMART/CONTAINER Component
 * 
 * MILESTONE 2: Master Component Communication
 * 
 * Demonstrates:
 * ✅ Smart Component Pattern (has business logic and state)
 * ✅ Service injection (ExpenseService)
 * ✅ Composing multiple child components
 * ✅ Parent-to-Child communication via @Input()
 * ✅ Child-to-Parent communication via @Output()
 * ✅ Passing data through component hierarchy
 * ✅ All lifecycle hooks
 * ✅ Event handling from children
 * 
 * Smart Component Characteristics:
 * - Injects services
 * - Manages state (transactions, notifications)
 * - Makes decisions about which children to render
 * - Handles @Input and @Output communication
 * - Contains business logic
 * - Passes data down to Dumb (Presentational) components
 * 
 * Component Hierarchy:
 * Dashboard (Smart)
 *   ├── SummaryCard (Dumb) × 3
 *   ├── RecentTransactions (Smart parent for transactions)
 *   │   └── TransactionItem (Dumb) × N
 *   ├── Profile (Dumb)
 *   └── Notification (Dumb with @Output)
 * 
 * Data Flow:
 * 1. Dashboard loads via ngOnInit
 * 2. Gets transactions from ExpenseService
 * 3. Passes transactions to RecentTransactions component
 * 4. RecentTransactions loops and creates TransactionItem children
 * 5. Each TransactionItem displays transaction data
 * 6. When user interacts (e.g., clicks Notification button)
 * 7. Child emits @Output event
 * 8. Dashboard receives event and handles it
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Card,
    SummaryCard,
    RecentTransactions,
    Profile,
    Notification
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  // ═══════════════════════════════════════════════════════════════════════
  // COMPONENT STATE
  // ═══════════════════════════════════════════════════════════════════════

  // Milestone 1: Original card data (still used)
  cardData = [
    { title: 'Income', amount: 50000, color: 'green' },
    { title: 'Expenses', amount: 20000, color: 'orange' },
    { title: 'Savings', amount: 30000, color: 'blue' }
  ];

  // Track selected card
  selectedCard: string | null = null;

  // Search text - TWO-WAY BINDING
  searchText: string = '';

  // Transactions list from service
  transactions: Expense[] = [];

  // Filtered transactions based on search
  filteredTransactions: Expense[] = [];

  // ═══════════════════════════════════════════════════════════════════════
  // MILESTONE 2: New Component Data
  // ═══════════════════════════════════════════════════════════════════════

  // Summary Card data for Milestone 2 (more structured)
  summaryCards = [
    { title: 'Income', amount: 50000, color: 'green', icon: '📈' },
    { title: 'Expenses', amount: 20000, color: 'orange', icon: '📉' },
    { title: 'Savings', amount: 30000, color: 'blue', icon: '💰' }
  ];

  // Profile data passed to Profile component
  profileData = {
    name: 'Rilwan Haq',
    email: 'rilwan.haq@smartexpense.com',
    designation: 'Software Engineer',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rilwan',
    joinDate: new Date('2024-01-15'),
    transactionCount: 0,
    totalSpending: 0
  };

  // Notification state
  notifications: any[] = [
    {
      message: 'Dashboard initialized successfully',
      type: 'info',
      showClose: true,
      autoDismiss: 5000,
      pendingCount: 1
    }
  ];

  // Track cleared notifications
  notificationHistory: string[] = [];

  // ═══════════════════════════════════════════════════════════════════════
  // DEPENDENCY INJECTION
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Constructor with dependency injection
   * Injects ExpenseService to fetch transaction data
   * 
   * Smart components usually have service injections.
   * Dumb components do NOT inject services.
   */
  constructor(private expenseService: ExpenseService) {}

  // ═══════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * ngOnInit() - Component initialization
   * Called once after component is created
   * Perfect for:
   * - Loading data from services
   * - Setting up initial state
   * - Calculating derived values
   */
  ngOnInit(): void {
    console.log('🎯 Dashboard loaded');
    
    // Get transactions from service (Smart component responsibility)
    this.transactions = this.expenseService.getTransactions();
    this.filteredTransactions = this.transactions;

    // Calculate statistics for profile
    this.profileData.transactionCount = this.transactions.length;
    this.profileData.totalSpending = this.transactions.reduce(
      (sum, t) => sum + t.amount, 
      0
    );

    console.log(`📊 Loaded ${this.transactions.length} transactions`);
    console.log(`💵 Total spending: ₹${this.profileData.totalSpending}`);
  }

  /**
   * ngOnDestroy() - Component cleanup
   * Called when component is removed from DOM
   */
  ngOnDestroy(): void {
    console.log('🗑️ Dashboard component destroyed');
  }

  // ═══════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS FROM CHILD COMPONENTS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Handle card click from CardComponent (Milestone 1)
   * @Output event from child component
   */
  onCardClick(cardTitle: string): void {
    this.selectedCard = cardTitle;
    console.log(`✅ Selected Card: ${cardTitle}`);
  }

  /**
   * Handle search input change
   * TWO-WAY BINDING: [(ngModel)]="searchText"
   */
  onSearchChange(): void {
    if (this.searchText.trim() === '') {
      this.filteredTransactions = this.transactions;
      console.log('🔍 Search cleared');
    } else {
      console.log(`🔍 Searching for: ${this.searchText}`);
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        transaction.category.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  /**
   * Handle @Output event from Notification component
   * Called when user clicks "Clear Notifications"
   * 
   * CHILD → PARENT COMMUNICATION:
   * 1. User clicks button in Notification component
   * 2. Notification emits: this.clearNotifications.emit(message)
   * 3. Dashboard receives event: (clearNotifications)="onNotificationsCleared($event)"
   * 4. This handler runs with the emitted message
   */
  onNotificationsCleared(message: string): void {
    console.log(`📢 ${message}`);
    this.notificationHistory.push(message);
    
    // Clear current notifications
    this.notifications = [];
    
    // Add a new notification to confirm
    this.addNotification(`${message}`, 'success', 4000);
  }

  /**
   * Handle @Output event when notification is dismissed
   */
  onNotificationDismissed(message: string): void {
    console.log(`❌ Notification dismissed: ${message}`);
  }

  /**
   * Handle @Output event when notification action is triggered
   */
  onNotificationAction(action: string): void {
    console.log(`🎯 Notification action: ${action}`);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // SMART COMPONENT HELPER METHODS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Add notification to display
   * Smart component manages notification state
   */
  addNotification(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    autoDismiss: number = 0
  ): void {
    const notification = {
      message,
      type,
      showClose: true,
      autoDismiss,
      pendingCount: this.notifications.length + 1
    };
    this.notifications.push(notification);
  }

  /**
   * Check if transaction amount is high (> 5000)
   * Used for conditional styling with [ngClass]
   */
  isHighExpense(amount: number): boolean {
    return amount > 5000;
  }

  /**
   * Get total of all transactions
   */
  getTotalTransactions(): number {
    return this.transactions.length;
  }

  /**
   * Get count of high expenses
   */
  getHighExpenseCount(): number {
    return this.transactions.filter(t => t.amount > 5000).length;
  }
}

