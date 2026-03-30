import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../services/device';
import { AuthService } from '../../services/auth';
import { AiService } from '../../services/ai';
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
  isGeneratingDescription = false;
  descriptionError = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService,
    private authService: AuthService,
    private aiService: AiService,
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

  generateDescription(): void {
    if (!this.device) return;
    this.isGeneratingDescription = true;
    this.descriptionError = '';

    this.aiService.generateDescription(this.device.id).subscribe({
      next: (result) => {
        this.deviceService.updateDescription(this.device!.id, result).subscribe({
          next: () => {
            this.deviceService.getById(this.device!.id).subscribe(device => {
              this.device = device;
              this.isGeneratingDescription = false;
              this.cdr.detectChanges();
            });
          },
          error: () => {
            this.descriptionError = 'Failed to generate description.';
            this.isGeneratingDescription = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.descriptionError = 'Failed to generate description.';
        this.isGeneratingDescription = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/devices']);
  }
}
