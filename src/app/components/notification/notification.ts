import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * NotificationComponent - Dumb Component with @Output()
 * 
 * Responsibility: DISPLAY notifications and EMIT events to parent
 * 
 * Demonstrates:
 * - @Input() for receiving notification data
 * - @Output() and EventEmitter for child-to-parent communication
 * - Event binding in template: (click)="handleAction()"
 * - All lifecycle hooks
 * 
 * Parent-Child Communication Pattern - CHILD TO PARENT (@Output):
 * 
 * PARENT (Dashboard):
 * <app-notification
 *   [message]="'New expense added'"
 *   (clearNotifications)="onNotificationsCleared()"
 * ></app-notification>
 * 
 * CHILD (This Component):
 * @Output() clearNotifications = new EventEmitter<string>();
 * 
 * When user clicks "Clear":
 * 1. User clicks button
 * 2. handleClear() method runs
 * 3. this.clearNotifications.emit('Notifications cleared')
 * 4. Event travels UP to parent
 * 5. Parent handler (clearNotifications)="onNotificationsCleared()" runs
 * 
 * Why @Output?
 * - Child needs to communicate BACK to parent
 * - Parent needs to know when to update state
 * - Maintains unidirectional data flow
 * - Parent still owns the data/state
 * - Child triggers action, parent handles it
 * 
 * Contrast with @Input:
 * @Input:  Parent → Child (one-way data binding)
 * @Output: Child → Parent (event communication)
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification implements OnInit, OnChanges, OnDestroy {
  /**
   * INPUT: Notification message
   * Parent passes: [message]="'Your expense was saved'"
   */
  @Input() message: string = 'Notification';

  /**
   * INPUT: Notification type (for styling)
   * Types: 'success', 'error', 'warning', 'info'
   * Parent passes: [type]="'success'"
   */
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';

  /**
   * INPUT: Show close button?
   * Parent passes: [showClose]="true"
   */
  @Input() showClose: boolean = true;

  /**
   * INPUT: Auto-dismiss after milliseconds
   * 0 = never auto-dismiss
   * Parent passes: [autoDismiss]="5000" (5 seconds)
   */
  @Input() autoDismiss: number = 0;

  /**
   * INPUT: Number of pending notifications
   * Used for badge count
   * Parent passes: [pendingCount]="5"
   */
  @Input() pendingCount: number = 0;

  /**
   * OUTPUT: Event emitted when user clears notifications
   * 
   * CHILD EMITS: this.clearNotifications.emit('message')
   * PARENT LISTENS: (clearNotifications)="handleClear()"
   * 
   * EventEmitter<string> means:
   * - The event carries a string payload
   * - Parent receives: $event = 'Notifications cleared'
   * - Parent can access in handler: onClear(message: string)
   */
  @Output() clearNotifications = new EventEmitter<string>();

  /**
   * OUTPUT: Event emitted when notification is dismissed
   * Carries the notification message
   */
  @Output() notificationDismissed = new EventEmitter<string>();

  /**
   * OUTPUT: Event emitted for notification actions
   * Carries action type
   */
  @Output() actionTriggered = new EventEmitter<string>();

  // Local state for component
  visible: boolean = true;
  dismissTimer: any = null;

  // ═══════════════════════════════════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * ngOnInit() - Component initialization
   */
  ngOnInit(): void {
    console.log(`🔔 Notification component initialized`);
    console.log(`   Type: ${this.type}, Message: ${this.message}`);
    
    // Setup auto-dismiss if configured
    if (this.autoDismiss > 0) {
      this.dismissTimer = setTimeout(() => {
        this.dismiss();
      }, this.autoDismiss);
      console.log(`⏰ Auto-dismiss set for ${this.autoDismiss}ms`);
    }
  }

  /**
   * ngOnChanges() - React to @Input changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      console.log(`🔄 Notification message changed:`, changes['message'].currentValue);
    }
    if (changes['pendingCount']) {
      console.log(`📊 Pending notifications updated:`, changes['pendingCount'].currentValue);
    }
  }

  /**
   * ngOnDestroy() - Cleanup
   */
  ngOnDestroy(): void {
    console.log(`🗑️ Notification component destroyed`);
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // COMPONENT LOGIC
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Clear all notifications
   * CHILD → PARENT Communication (@Output)
   * 
   * Step by step:
   * 1. User clicks "Clear Notifications" button
   * 2. handleClear() executes
   * 3. this.clearNotifications.emit() SENDS event UP
   * 4. Parent handler receives the event
   * 5. Parent updates its state
   */
  handleClear(): void {
    const message = `Cleared ${this.pendingCount} notifications`;
    console.log(`✨ ${message}`);
    
    // EMIT event to parent component
    // Parent listens with: (clearNotifications)="onClear($event)"
    this.clearNotifications.emit(message);
    
    this.dismiss();
  }

  /**
   * Handle custom action
   * CHILD → PARENT Communication (@Output)
   */
  handleAction(action: string): void {
    console.log(`🎯 Action triggered: ${action}`);
    this.actionTriggered.emit(action);
  }

  /**
   * Dismiss this notification
   * CHILD → PARENT Communication (@Output)
   */
  dismiss(): void {
    this.visible = false;
    console.log(`❌ Notification dismissed`);
    this.notificationDismissed.emit(this.message);
  }

  /**
   * Get CSS class based on notification type
   */
  getNotificationClass(): string {
    return `notification-${this.type}`;
  }

  /**
   * Get icon emoji based on type
   */
  getIcon(): string {
    const icons: Record<string, string> = {
      'success': '✅',
      'error': '❌',
      'warning': '⚠️',
      'info': 'ℹ️'
    };
    return icons[this.type] || 'ℹ️';
  }

  /**
   * Format the pending count display
   */
  getPendingCountText(): string {
    if (this.pendingCount === 0) return 'No pending notifications';
    if (this.pendingCount === 1) return '1 notification';
    return `${this.pendingCount} notifications`;
  }
}
