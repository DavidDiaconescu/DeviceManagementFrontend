import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DeviceService } from '../../services/device';
import { DeviceType, CreateDeviceRequest, UpdateDeviceRequest } from '../../models/device.model';

@Component({
  selector: 'app-device-form',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './device-form.html',
  styleUrl: './device-form.scss',
})
export class DeviceForm implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  deviceId: number | null = null;
  deviceTypes = Object.values(DeviceType);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      type: ['', Validators.required],
      operatingSystem: ['', Validators.required],
      osVersion: ['', Validators.required],
      processor: ['', Validators.required],
      ram: [null, [Validators.required, Validators.min(1)]],
      description: [null]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.deviceId = Number(idParam);
      this.deviceService.getById(this.deviceId).subscribe(device => {
        this.form.patchValue({
          name: device.name,
          manufacturer: device.manufacturer,
          type: device.type,
          operatingSystem: device.operatingSystem,
          osVersion: device.osVersion,
          processor: device.processor,
          ram: device.ram,
          description: device.description
        });
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const value = this.form.value;

    if (this.isEditMode && this.deviceId !== null) {
      const request: UpdateDeviceRequest = {
        name: value.name,
        manufacturer: value.manufacturer,
        type: value.type,
        operatingSystem: value.operatingSystem,
        osVersion: value.osVersion,
        processor: value.processor,
        ram: value.ram,
        description: value.description || null
      };
      this.deviceService.update(this.deviceId, request).subscribe({
        next: () => this.router.navigate(['/devices']),
        error: err => console.error('Update failed', err)
      });
    } else {
      const request: CreateDeviceRequest = {
        name: value.name,
        manufacturer: value.manufacturer,
        type: value.type,
        operatingSystem: value.operatingSystem,
        osVersion: value.osVersion,
        processor: value.processor,
        ram: value.ram
      };
      this.deviceService.create(request).subscribe({
        next: () => this.router.navigate(['/devices']),
        error: err => console.error('Create failed', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/devices']);
  }
}
