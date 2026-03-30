import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: FormGroup;
  errorMessage: string | null = null;
  roles = ['Admin', 'Developer', 'QA', 'Manager'];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.errorMessage = null;
    this.authService.register(this.form.value).subscribe({
      next: (response) => {
        this.authService.saveToken(response);
        this.router.navigate(['/devices']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
