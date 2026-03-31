import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Device,
  CreateDeviceRequest,
  UpdateDeviceRequest
} from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly baseUrl = 'http://localhost:5021/api/devices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Device[]> {
    return this.http.get<Device[]>(this.baseUrl);
  }

  getById(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.baseUrl}/${id}`);
  }

  create(request: CreateDeviceRequest): Observable<Device> {
    return this.http.post<Device>(this.baseUrl, request);
  }

  update(id: number, request: UpdateDeviceRequest): Observable<Device> {
    return this.http.put<Device>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  assign(deviceId: number): Observable<Device> {
    return this.http.post<Device>(`${this.baseUrl}/${deviceId}/assign`, {});
  }

  unassign(deviceId: number): Observable<Device> {
    return this.http.delete<Device>(`${this.baseUrl}/${deviceId}/unassign`, { body: {} });
  }

  updateDescription(id: number, description: string): Observable<Device> {
    return this.http.put<Device>(`${this.baseUrl}/${id}/description`, JSON.stringify(description), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  forceUnassign(deviceId: number): Observable<Device> {
    return this.http.delete<Device>(`${this.baseUrl}/${deviceId}/force-unassign`);
  }

  search(query: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(`${this.baseUrl}/search?query=${encodeURIComponent(query)}`);
  }
}

export interface SearchResult extends Device {
  score: number;
}
