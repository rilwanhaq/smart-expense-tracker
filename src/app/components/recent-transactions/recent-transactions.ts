import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionItem } from '../transaction-item/transaction-item';
import { Expense } from '../../models/expense';

/**
 * RecentTransactionsComponent - Smart/Container Component
 * 
 * Responsibility: MANAGE transaction data and coordinate with child components
 * 
 * Demonstrates:
 * - @Input() to receive transactions from parent (Dashboard)
 * - Component composition (*ngFor with TransactionItem)
 * - Parent-child data flow
 * - Smart component pattern (has logic and data management)
 * - All lifecycle hooks
 * 
 * Smart Component vs Dumb Component:
 * 
 * SMART (This Component):
 * ✅ Receives transactions array
 * ✅ Manages local state (filtering, sorting)
 * ✅ Injects services (if needed)
 * ✅ Makes decisions about which children to render
 * ✅ Handles @Input and @Output communication
 * ✅ Located: parent, container, page components
 * 
 * DUMB (TransactionItem):
 * ✅ Receives data via @Input()
 * ✅ No services injected
 * ✅ No local state
 * ✅ Renders what it's told
 * ✅ Reusable anywhere
 * ✅ Easy to test
 * ✅ Located: child, presentational components
 * 
 * Parent-Child Flow:
 * 1. Dashboard (Parent) has transactions: Expense[]
 * 2. Dashboard passes: [transactions]="transactions"
 * 3. RecentTransactions receives via @Input()
 * 4. RecentTransactions loops with *ngFor
 * 5. For each transaction, creates TransactionItem child
 * 6. Passes transaction data via property binding
 * 7. TransactionItem displays it
 */
@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [CommonModule, TransactionItem],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.scss'
})
export class RecentTransactions implements OnInit, OnChanges, OnDestroy {
  /**
   * INPUT: Array of transactions from parent component
   * Parent passes: [transactions]="this.transactions"
   * 
   * Data Flow:
   * Dashboard → [Input] → RecentTransactions → [loop] → TransactionItem
   */
  @Input() transactions: Expense[] = [];

  // Local state for component logic
  displayedTransactions: Expense[] = [];
  sortBy: 'date' | 'amount' = 'date';
  isLoading: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * ngOnInit() - Component initialization
   * Called once after component is created
   */
  ngOnInit(): void {
    console.log(`📊 RecentTransactions component initialized`);
    console.log(`   Total transactions: ${this.transactions.length}`);
    this.processTransactions();
  }

  /**
   * ngOnChanges() - React to @Input property changes
   * Called whenever parent updates [transactions] property
   * 
   * Scenario:
   * - User adds new transaction
   * - Parent calls addTransaction()
   * - transactions array grows
   * - Parent re-renders template
   * - [transactions]="newArray" binding updates
   * - ngOnChanges() fires in THIS component
   * - We process the new data
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      const { previousValue, currentValue } = changes['transactions'];
      console.log(`🔄 Transactions changed:`);
      console.log(`   Previous count: ${previousValue?.length ?? 0}`);
      console.log(`   Current count: ${currentValue?.length ?? 0}`);
      this.processTransactions();
    }
  }

  /**
   * ngOnDestroy() - Component cleanup
   * Called when component is destroyed
   */
  ngOnDestroy(): void {
    console.log(`🗑️ RecentTransactions component destroyed`);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // COMPONENT LOGIC - Smart Component Responsibilities
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Process transactions: sort, filter, validate
   * This is SMART component logic
   * Dumb child components DON'T do this - they just display
   */
  private processTransactions(): void {
    if (!this.transactions || this.transactions.length === 0) {
      this.displayedTransactions = [];
      return;
    }

    // Make a copy to avoid mutating input
    this.displayedTransactions = [...this.transactions];

    // Sort based on current sortBy setting
    if (this.sortBy === 'date') {
      this.displayedTransactions.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (this.sortBy === 'amount') {
      this.displayedTransactions.sort((a, b) => b.amount - a.amount);
    }

    console.log(`✅ Processed ${this.displayedTransactions.length} transactions (sorted by ${this.sortBy})`);
  }

  /**
   * Sort transactions by date or amount
   * SMART component handles sorting logic
   */
  sortTransactions(sortBy: 'date' | 'amount'): void {
    this.sortBy = sortBy;
    this.processTransactions();
    console.log(`🔀 Transactions sorted by ${sortBy}`);
  }

  /**
   * Get total amount from all transactions
   * SMART component calculates aggregates
   */
  getTotalAmount(): number {
    return this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  /**
   * Get count of high-value transactions
   * SMART component filters and counts
   */
  getHighExpenseCount(): number {
    return this.transactions.filter(t => t.amount > 5000).length;
  }

  /**
   * Check if any transactions exist
   * Used in template to show empty state
   */
  hasTransactions(): boolean {
    return this.displayedTransactions.length > 0;
  }

  /**
   * Get most recent transaction
   * SMART component calculates derived data
   */
  getMostRecentTransaction(): Expense | null {
    if (this.transactions.length === 0) return null;
    return this.transactions.reduce((latest, current) =>
      new Date(current.date).getTime() > new Date(latest.date).getTime() ? current : latest
    );
  }
}
