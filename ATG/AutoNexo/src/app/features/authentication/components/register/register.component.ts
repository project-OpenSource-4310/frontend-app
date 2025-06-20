import {Component, ViewEncapsulation} from '@angular/core';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {Router, RouterLink} from '@angular/router';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DriverService} from '../../services/driver.service';
import {MechanicService} from '../../services/mechanic.service';
import {Driver} from '../../models/driver.entity';
import {Mechanic} from '../../models/mechanic.entity';

@Component({
  selector: 'app-register',
  imports: [
    GobackButtonComponent,
    RouterLink,
    ClassicButtonComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  selectedRole: 'driver' | 'mechanic' = 'driver'; // valor por defecto


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private driverService: DriverService,
    private _snackBar: MatSnackBar,
    private mechanicService: MechanicService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    }, { validators: this.passwordsMatchValidator });
  }

  selectRole(role: 'driver' | 'mechanic') {
    this.selectedRole = role;
  }
  register() {
    console.log('Usuario registrado:', this.form.value);

    if (this.form.invalid) return;

    const { firstName, lastName, phone, email, password } = this.form.value;

    this.loading = true;

    if (this.selectedRole === 'driver') {
      const driver = new Driver({ firstName, lastName, phone, email, password, vehicles_owned: [] });
      this.driverService.create(driver).subscribe({
        next: () => {
          this._snackBar.open('Registro exitoso', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.router.navigateByUrl('/authentication/login');
        },
        error: () => {
          this.loading = false;
          this._snackBar.open('Error al registrar', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      });
    } else {
      const mechanic = new Mechanic({ firstName, lastName, phone, email, password, vehicles_assigned: [] });
      this.mechanicService.create(mechanic).subscribe({
        next: () => {
          this._snackBar.open('Registro exitoso', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          this.router.navigateByUrl('/authentication/login');
        },
        error: () => {
          this.loading = false;
          this._snackBar.open('Error al registrar', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      });
    }
  }

  private passwordsMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
