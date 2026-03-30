import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Device,
  CreateDeviceRequest,
  UpdateDeviceRequest,
  AssignDeviceRequest
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

  assign(deviceId: number, request: AssignDeviceRequest): Observable<Device> {
    return this.http.post<Device>(`${this.baseUrl}/${deviceId}/assign`, request);
  }

  unassign(deviceId: number, request: AssignDeviceRequest): Observable<Device> {
    return this.http.delete<Device>(`${this.baseUrl}/${deviceId}/unassign`, { body: request });
  }
}
