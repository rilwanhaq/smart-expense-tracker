import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SummaryCardComponent - Dumb/Presentational Component
 * 
 * Responsibility: ONLY display data passed via @Input()
 * 
 * Demonstrates:
 * - @Input() decorator for receiving data from parent
 * - Dumb component pattern (no business logic)
 * - ngOnInit, ngOnChanges, ngOnDestroy lifecycle hooks
 * - Responsive card design
 * 
 * Why Dumb Component?
 * - Has NO dependency injection
 * - Receives ALL data via @Input()
 * - NO side effects or business logic
 * - 100% REUSABLE across the app
 * - EASY to test (pure function)
 * - NO knowledge of parent component
 */
@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss'
})
export class SummaryCard implements OnInit, OnChanges, OnDestroy {
  /**
   * INPUT: Title of the card
   * Examples: "Income", "Expenses", "Savings"
   * Parent passes via: [title]="'Income'"
   */
  @Input() title: string = 'Card Title';

  /**
   * INPUT: Amount to display
   * Examples: 50000, 20000, 30000
   * Parent passes via: [amount]="50000"
   */
  @Input() amount: number = 0;

  /**
   * INPUT: Background color variant
   * Options: 'green', 'orange', 'blue', 'red', 'purple'
   * Parent passes via: [color]="'green'"
   */
  @Input() color: string = 'blue';

  /**
   * INPUT: Icon emoji
   * Examples: '💰', '💸', '💳'
   * Parent passes via: [icon]="'💰'"
   */
  @Input() icon: string = '💳';

  // ═══════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS - Demonstrate Component Lifecycle
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * LIFECYCLE HOOK: ngOnInit()
   * 
   * When: Called ONCE after component is created and @Input values are set
   * Use: Initial setup, calculations that don't depend on input changes
   * 
   * Flow: Constructor → ngOnInit() → (display) → ngOnChanges() → ngOnDestroy()
   */
  ngOnInit(): void {
    console.log(`✅ SummaryCard Initialized`);
    console.log(`   Title: ${this.title}`);
    console.log(`   Amount: ₹${this.amount}`);
    console.log(`   Color: ${this.color}`);
  }

  /**
   * LIFECYCLE HOOK: ngOnChanges()
   * 
   * When: Called whenever ANY @Input property changes
   * Parameter: SimpleChanges object containing changed properties
   * 
   * Use: Detect and react to @Input changes
   * Example: Parent updates [amount]="newAmount" → ngOnChanges() fires
   * 
   * @param changes - Contains previousValue, currentValue for each changed input
   */
  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(changes).forEach(key => {
      const change = changes[key];
      console.log(`🔄 ${this.title} - ${key} changed:`);
      console.log(`   Previous: ${change.previousValue}`);
      console.log(`   Current: ${change.currentValue}`);
    });
  }

  /**
   * LIFECYCLE HOOK: ngOnDestroy()
   * 
   * When: Called just before component is destroyed/removed from DOM
   * Use: Cleanup - unsubscribe from observables, clear timers, free resources
   * 
   * Important: Always clean up to prevent memory leaks!
   */
  ngOnDestroy(): void {
    console.log(`🗑️ SummaryCard Destroyed: ${this.title}`);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // COMPONENT LOGIC - Helpers for template
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Check if amount is considered "high"
   * Used for conditional styling
   * @returns true if amount > 5000
   */
  isHighAmount(): boolean {
    return this.amount > 5000;
  }

  /**
   * Get CSS class name based on amount
   * Used with [ngClass] in template for dynamic styling
   * @returns 'high-amount' or 'normal-amount'
   */
  getAmountClass(): string {
    return this.isHighAmount() ? 'high-amount' : 'normal-amount';
  }

  /**
   * Format amount with commas
   * @returns formatted amount like "50,000"
   */
  formatAmount(): string {
    return this.amount.toLocaleString('en-IN');
  }
}
