import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DeviceService } from '../../services/device';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-device-list',
  imports: [RouterModule],
  templateUrl: './device-list.html',
  styleUrl: './device-list.scss',
})
export class DeviceList implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getAll().subscribe({
      next: (devices) => {
        this.devices = devices;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading devices:', err)
    });
  }

  deleteDevice(id: number): void {
    if (window.confirm('Are you sure you want to delete this device?')) {
      this.deviceService.delete(id).subscribe(() => {
        this.loadDevices();
      });
    }
  }
}
