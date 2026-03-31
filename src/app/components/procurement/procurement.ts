import { Component, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcurementService } from '../../services/procurement';
import { ProcurementSuggestion } from '../../models/procurement.model';

@Component({
  selector: 'app-procurement',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './procurement.html',
  styleUrl: './procurement.scss',
})
export class Procurement {
  totalBudget: number | null = null;
  employeeCount: number | null = null;
  currency = 'RON';
  isLoading = false;
  suggestion: ProcurementSuggestion | null = null;
  errorMessage = '';

  currencies = ['RON', 'EUR', 'USD'];

  constructor(private procurementService: ProcurementService, private cdr: ChangeDetectorRef) {}

  get budgetPerEmployeePreview(): number | null {
    if (this.totalBudget && this.employeeCount && this.employeeCount > 0) {
      return Math.round(this.totalBudget / this.employeeCount);
    }
    return null;
  }

  getSuggestion(): void {
    if (!this.totalBudget || !this.employeeCount || this.totalBudget <= 0 || this.employeeCount <= 0) {
      this.errorMessage = 'Please enter a valid budget and employee count.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.suggestion = null;

    this.procurementService.getSuggestion({
      totalBudget: this.totalBudget,
      employeeCount: this.employeeCount,
      currency: this.currency
    }).subscribe({
      next: (result) => {
        this.suggestion = result;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to get suggestion. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
