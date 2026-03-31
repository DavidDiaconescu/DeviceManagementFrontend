import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcurementRequest, ProcurementSuggestion } from '../models/procurement.model';

@Injectable({
  providedIn: 'root',
})
export class ProcurementService {
  private readonly baseUrl = 'http://localhost:5021/api/procurement';

  constructor(private http: HttpClient) {}

  getSuggestion(request: ProcurementRequest): Observable<ProcurementSuggestion> {
    return this.http.post<ProcurementSuggestion>(`${this.baseUrl}/suggest`, request);
  }
}
