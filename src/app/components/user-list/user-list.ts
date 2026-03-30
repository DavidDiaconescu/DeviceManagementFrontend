import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.cdr.detectChanges();
    });
  }
}
