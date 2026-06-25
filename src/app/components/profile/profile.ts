import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ProfileComponent - Dumb/Presentational Component
 * 
 * Responsibility: DISPLAY user profile information only
 * 
 * Demonstrates:
 * - @Input() properties (name, email, designation)
 * - Property binding for image [src]
 * - Dumb component pattern
 * - All lifecycle hooks
 * - No service injection
 * - No local state
 * - Reusable anywhere
 * 
 * Dumb Component Characteristics:
 * ✅ Receives all data via @Input()
 * ✅ No services injected
 * ✅ No local state management
 * ✅ Pure presentation logic only
 * ✅ Easy to test (no dependencies)
 * ✅ Highly reusable (different parent components can use it)
 * ✅ No side effects
 * 
 * Usage in Parent:
 * <app-profile
 *   [name]="'Rilwan Haq'"
 *   [email]="'rilwan@smartexpense.com'"
 *   [designation]="'Software Engineer'"
 * ></app-profile>
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit, OnChanges, OnDestroy {
  /**
   * INPUT: User name
   * Parent passes: [name]="'John Doe'"
   * Property binding example
   */
  @Input() name: string = 'User';

  /**
   * INPUT: User email
   * Parent passes: [email]="'user@email.com'"
   */
  @Input() email: string = 'user@smartexpense.com';

  /**
   * INPUT: User designation/title
   * Parent passes: [designation]="'Software Engineer'"
   */
  @Input() designation: string = 'Member';

  /**
   * INPUT: User profile image URL
   * Parent passes: [profileImage]="imageUrl"
   * Used with property binding: [src]="profileImage"
   */
  @Input() profileImage: string = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

  /**
   * INPUT: User join date
   * Parent passes: [joinDate]="new Date()"
   */
  @Input() joinDate: Date = new Date();

  /**
   * INPUT: Number of transactions
   * Parent passes: [transactionCount]="123"
   */
  @Input() transactionCount: number = 0;

  /**
   * INPUT: Total spending amount
   * Parent passes: [totalSpending]="50000"
   */
  @Input() totalSpending: number = 0;

  // ═══════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * ngOnInit() - Component initialization
   * Called once after component is created and @Input values are set
   */
  ngOnInit(): void {
    console.log(`👤 Profile component initialized`);
    console.log(`   User: ${this.name}`);
    console.log(`   Email: ${this.email}`);
  }

  /**
   * ngOnChanges() - React to @Input changes
   * Called whenever parent updates any @Input property
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['email'] || changes['designation']) {
      console.log(`🔄 Profile data changed:`, changes);
    }
  }

  /**
   * ngOnDestroy() - Component cleanup
   * Called when component is removed from DOM
   */
  ngOnDestroy(): void {
    console.log(`🗑️ Profile component destroyed`);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // TEMPLATE HELPER METHODS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Get user initials for fallback avatar
   * Example: "Rilwan Haq" → "RH"
   */
  getInitials(): string {
    return this.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  /**
   * Format email with mask for privacy
   * Example: "user@email.com" → "u***@email.com"
   */
  getMaskedEmail(): string {
    const [username, domain] = this.email.split('@');
    if (username.length <= 2) {
      return `${username}***@${domain}`;
    }
    return `${username[0]}${'*'.repeat(username.length - 2)}@${domain}`;
  }

  /**
   * Get member badge color based on transaction count
   * More transactions = higher tier
   */
  getMemberBadgeColor(): string {
    if (this.transactionCount > 50) return 'gold';
    if (this.transactionCount > 20) return 'silver';
    if (this.transactionCount > 5) return 'bronze';
    return 'standard';
  }

  /**
   * Get member tier label
   */
  getMemberTier(): string {
    if (this.transactionCount > 50) return 'Gold Member';
    if (this.transactionCount > 20) return 'Silver Member';
    if (this.transactionCount > 5) return 'Bronze Member';
    return 'Standard Member';
  }
}
