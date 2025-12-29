import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;
  error: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      
      // Nouveaux champs (Optionnels)
      age: [''],
      ville: [''],
      code_postal: [''],
      
      isStudent: [false]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';

      const formValue = this.registerForm.value;

      // Préparation des données pour l'API
      const userData = {
        firstname: formValue.firstname,
        lastname: formValue.lastname,
        email: formValue.email,
        password: formValue.password,
        
        // Nouveaux champs
        age: formValue.age || null,
        ville: formValue.ville || null,
        code_postal: formValue.code_postal || null,

        status: formValue.isStudent ? 'student' : null
      };

      this.authService.register(userData).subscribe({
        next: () => {
          this.loading = false;
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Erreur lors de l\'inscription. Email peut-être déjà utilisé.';
          console.error('Register error:', error);
        }
      });
    }
  }
}