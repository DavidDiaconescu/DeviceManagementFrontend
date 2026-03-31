export interface ProcurementRequest {
  totalBudget: number;
  employeeCount: number;
  currency: string;
}

export interface ProcurementSuggestion {
  totalBudget: number;
  employeeCount: number;
  budgetPerEmployee: number;
  currency: string;
  suggestion: string;
}
