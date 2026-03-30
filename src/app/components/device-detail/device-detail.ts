import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DeviceService } from '../../services/device';
import { UserService } from '../../services/user';
import { Device } from '../../models/device.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-device-detail',
  imports: [FormsModule, RouterModule],
  templateUrl: './device-detail.html',
  styleUrl: './device-detail.scss',
})
export class DeviceDetail implements OnInit {
  device: Device | null = null;
  users: User[] = [];
  selectedUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deviceService.getById(id).subscribe(device => {
      this.device = device;
      this.cdr.detectChanges();
    });
    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.cdr.detectChanges();
    });
  }

  assign(): void {
    if (!this.device || !this.selectedUserId) return;
    this.deviceService.assign(this.device.id, { userId: this.selectedUserId }).subscribe(device => {
      this.device = device;
      this.cdr.detectChanges();
    });
  }

  unassign(): void {
    if (!this.device || !this.device.assignedUserId) return;
    this.deviceService.unassign(this.device.id, { userId: this.device.assignedUserId }).subscribe(device => {
      this.device = device;
      this.cdr.detectChanges();
    });
  }

  goBack(): void {
    this.router.navigate(['/devices']);
  }
}
