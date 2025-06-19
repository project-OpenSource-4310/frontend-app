import {Component, ViewEncapsulation} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ClassicButtonComponent} from '../../../../shared/components/buttons/classic-button/classic-button.component';
import {GobackButtonComponent} from '../../../../shared/components/buttons/goback-button/goback-button.component';
import {TranslatePipe} from '@ngx-translate/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';
import {DriverService} from '../../services/driver.service';
import {MechanicService} from '../../services/mechanic.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ClassicButtonComponent,
    GobackButtonComponent,
    TranslatePipe,
    MatProgressSpinner,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  form:FormGroup;
  loading:boolean=false;

  constructor(private fb:FormBuilder,private router:Router,private _snackBar:MatSnackBar, private driverService: DriverService,private mechanicService: MechanicService ) {
    this.form = fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    })
  }
  access(){
    console.log(this.form.value.email,this.form.value.password);
    console.log(this.form.status);
    const { email, password } = this.form.value;
    this.driverService.getAll().subscribe(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        this.loading = true;
        localStorage.setItem('user', JSON.stringify({id:user.id,role:'driver'}));
        setTimeout(() => {
          this.router.navigateByUrl('/driver-page');
        }, 2000);
      }
    });
    this.mechanicService.getAll().subscribe(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        this.loading = true;
        localStorage.setItem('user', JSON.stringify({id:user.id,role:'mechanic'}));
        setTimeout(() => {
          this.router.navigateByUrl('/mechanic-page');
        }, 2000);
      } else {
        this.error();
      }
    });
  }
  error(){
    this._snackBar.open('Credenciales_Incorrectas','',{
      duration:2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}


