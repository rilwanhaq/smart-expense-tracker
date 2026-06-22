import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CardComponent - Reusable card for displaying expense data
 * Demonstrates:
 * - @Input() decorator for receiving data from parent
 * - @Output() with EventEmitter for sending events to parent
 * - Property binding [property]
 * - Event binding (click)
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  /**
   * INPUT: Receive title from parent component
   * PROPERTY BINDING: [title]="'Income'" in parent template
   */
  @Input() title: string = 'Card Title';

  /**
   * INPUT: Receive amount from parent component
   * PROPERTY BINDING: [amount]="50000" in parent template
   */
  @Input() amount: number = 0;

  /**
   * INPUT: Receive color class from parent component
   * PROPERTY BINDING: [color]="'blue'" in parent template
   */
  @Input() color: string = 'blue';

  /**
   * OUTPUT: Emit event to parent component when card is clicked
   * EVENT BINDING in parent: (cardClicked)="handleCardClick($event)"
   * Emits the card title
   */
  @Output() cardClicked = new EventEmitter<string>();

  /**
   * Handle card click event
   * Emits the title to parent component
   */
  onCardClick(): void {
    this.cardClicked.emit(this.title);
  }
}

