import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly baseUrl = 'http://localhost:5021/api/ai';

  constructor(private http: HttpClient) {}

  generateDescription(deviceId: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/generate-description`, { deviceId }, { responseType: 'text' });
  }
}
