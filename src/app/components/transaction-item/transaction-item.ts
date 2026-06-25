import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

/**
 * TransactionItemComponent - Dumb/Presentational Component
 * 
 * Responsibility: Display a SINGLE transaction item
 * Used as child component inside RecentTransactionsComponent (via *ngFor)
 * 
 * Demonstrates:
 * - @Input() for receiving transaction data from parent
 * - Dumb component pattern (pure presentational)
 * - All lifecycle hooks (ngOnInit, ngOnChanges, ngOnDestroy)
 * - Currency and Date pipes
 * - Conditional styling with [ngClass]
 * - Component reusability
 * 
 * Parent-Child Flow:
 * 1. Parent has: transactions: Expense[]
 * 2. Parent loops: *ngFor="let transaction of transactions"
 * 3. Parent passes: [title]="transaction.title" [amount]="transaction.amount"
 * 4. Child receives via @Input()
 * 5. Child displays in template
 * 
 * Why Dumb Component?
 * - NO services injected
 * - NO business logic
 * - ONLY receives data via @Input()
 * - ONLY displays what's passed to it
 * - Can be reused anywhere
 * - Easy to unit test
 */
@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss'
})
export class TransactionItem implements OnInit, OnChanges, OnDestroy {
  /**
   * INPUT: Transaction title
   * Examples: "Grocery Shopping", "Gas Bill", "Movie Tickets"
   * Parent passes: [title]="transaction.title"
   */
  @Input() title: string = 'Transaction';

  /**
   * INPUT: Transaction amount
   * Examples: 3500, 2500, 800
   * Parent passes: [amount]="transaction.amount"
   */
  @Input() amount: number = 0;

  /**
   * INPUT: Transaction category
   * Examples: "Food", "Utilities", "Entertainment"
   * Parent passes: [category]="transaction.category"
   */
  @Input() category: string = 'Other';

  /**
   * INPUT: Transaction date
   * Parent passes: [date]="transaction.date"
   */
  @Input() date: Date = new Date();

  // ═══════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * ngOnInit() - Component initialization
   * Called once after all @Input properties are set
   */
  ngOnInit(): void {
    console.log(`📋 TransactionItem initialized: ${this.title} (₹${this.amount})`);
  }

  /**
   * ngOnChanges() - React to @Input changes
   * Called whenever parent updates any @Input property
   * 
   * Useful scenarios:
   * - Parent updates [amount] → Re-highlight if it's > 5000
   * - Parent updates [category] → Re-style based on category
   * - Parent updates [date] → Format and display new date
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['amount']) {
      const { previousValue, currentValue } = changes['amount'];
      console.log(`💵 Transaction amount changed: ${previousValue} → ${currentValue}`);
    }
  }

  /**
   * ngOnDestroy() - Cleanup when component destroyed
   * Called when parent removes this transaction from the list
   * 
   * Example scenario:
   * - User filters out this transaction
   * - Component removed from DOM
   * - ngOnDestroy() called for cleanup
   */
  ngOnDestroy(): void {
    console.log(`❌ TransactionItem destroyed: ${this.title}`);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TEMPLATE HELPER METHODS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Determine if this is a high-value transaction
   * Used for visual highlighting
   * @returns true if amount > 5000
   */
  isHighExpense(): boolean {
    return this.amount > 5000;
  }

  /**
   * Get CSS class for amount styling
   * Applied with [ngClass] in template
   * @returns 'high-expense' or 'normal-expense'
   */
  getExpenseClass(): string {
    return this.isHighExpense() ? 'high-expense' : 'normal-expense';
  }

  /**
   * Get category icon based on category name
   * Enhances visual presentation
   * @returns emoji icon for category
   */
  getCategoryIcon(): string {
    const icons: { [key: string]: string } = {
      'Food': '🍔',
      'Utilities': '💡',
      'Entertainment': '🎬',
      'Travel': '✈️',
      'Shopping': '🛍️',
      'Health': '🏥',
      'Education': '📚',
      'Other': '📌'
    };
    return icons[this.category] || '📌';
  }

  /**
   * Get category color for styling
   * @returns color class name
   */
  getCategoryColor(): string {
    const colors: { [key: string]: string } = {
      'Food': 'category-food',
      'Utilities': 'category-utilities',
      'Entertainment': 'category-entertainment',
      'Travel': 'category-travel',
      'Shopping': 'category-shopping',
      'Health': 'category-health'
    };
    return colors[this.category] || 'category-other';
  }
}
