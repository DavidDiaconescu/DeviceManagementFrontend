import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DeviceService } from '../../services/device';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-device-list',
  imports: [RouterModule, FormsModule],
  templateUrl: './device-list.html',
  styleUrl: './device-list.scss',
})
export class DeviceList implements OnInit {
  devices: Device[] = [];
  searchQuery = '';
  isSearching = false;
  isSearchActive = false;
  private searchSubject = new Subject<string>();

  constructor(private deviceService: DeviceService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDevices();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.isSearchActive = !!query.trim();
        if (!query.trim()) {
          return this.deviceService.getAll();
        }
        return this.deviceService.search(query);
      })
    ).subscribe({
      next: (devices) => {
        this.devices = devices;
        this.isSearching = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Search error:', err);
        this.isSearching = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearchInput(): void {
    this.isSearching = true;
    this.searchSubject.next(this.searchQuery);
  }

  loadDevices(): void {
    this.isSearchActive = false;
    this.deviceService.getAll().subscribe({
      next: (devices) => {
        this.devices = devices;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading devices:', err)
    });
  }

  search(): void {
    if (!this.searchQuery.trim()) {
      this.loadDevices();
      return;
    }
    this.isSearching = true;
    this.searchSubject.next(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.isSearching = false;
    this.isSearchActive = false;
    this.searchSubject.next('');
  }

  deleteDevice(id: number): void {
    if (window.confirm('Are you sure you want to delete this device?')) {
      this.deviceService.delete(id).subscribe(() => {
        this.loadDevices();
      });
    }
  }
}
