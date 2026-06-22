import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';

/**
 * ExpenseService - Provides business logic for managing expenses
 * Responsibilities:
 * - Manage expense data
 * - Provide methods to get, add, delete expenses
 * - Injectable service (provided at root level)
 */
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  // Sample transaction data
  private transactions: Expense[] = [
    {
      id: 1,
      title: 'Grocery Shopping',
      amount: 3500,
      category: 'Food',
      date: new Date('2024-06-15')
    },
    {
      id: 2,
      title: 'Gas Bill',
      amount: 2500,
      category: 'Utilities',
      date: new Date('2024-06-14')
    },
    {
      id: 3,
      title: 'Movie Tickets',
      amount: 800,
      category: 'Entertainment',
      date: new Date('2024-06-13')
    },
    {
      id: 4,
      title: 'Internet Bill',
      amount: 6000,
      category: 'Utilities',
      date: new Date('2024-06-12')
    },
    {
      id: 5,
      title: 'Gym Membership',
      amount: 5500,
      category: 'Health',
      date: new Date('2024-06-11')
    }
  ];

  constructor() {}

  /**
   * Get all transactions
   * @returns Array of Expense objects
   */
  getTransactions(): Expense[] {
    return this.transactions;
  }

  /**
   * Add a new transaction
   * @param expense - The expense object to add
   */
  addTransaction(expense: Expense): void {
    this.transactions.push(expense);
  }

  /**
   * Delete a transaction
   * @param id - The transaction ID to delete
   */
  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }

  /**
   * Get total expense amount
   * @returns Sum of all expense amounts
   */
  getTotalExpense(): number {
    return this.transactions.reduce((sum, expense) => sum + expense.amount, 0);
  }
}
