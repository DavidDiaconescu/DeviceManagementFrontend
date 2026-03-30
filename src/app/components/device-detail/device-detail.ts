import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../services/device';
import { AuthService } from '../../services/auth';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-device-detail',
  imports: [RouterModule],
  templateUrl: './device-detail.html',
  styleUrl: './device-detail.scss',
})
export class DeviceDetail implements OnInit {
  device: Device | null = null;
  currentUserName: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.currentUserName = this.authService.getCurrentUserName();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deviceService.getById(id).subscribe(device => {
      this.device = device;
      this.cdr.detectChanges();
    });
  }

  assign(): void {
    if (!this.device) return;
    this.deviceService.assign(this.device.id).subscribe(device => {
      this.device = device;
      this.cdr.detectChanges();
    });
  }

  unassign(): void {
    if (!this.device) return;
    this.deviceService.unassign(this.device.id).subscribe(device => {
      this.device = device;
      this.cdr.detectChanges();
    });
  }

  goBack(): void {
    this.router.navigate(['/devices']);
  }
}
