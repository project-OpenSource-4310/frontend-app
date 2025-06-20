import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SideBarComponent} from "../../../../shared/components/side-bar/side-bar.component";
import {Driver} from '../../../authentication/models/driver.entity';
import {DriverService} from '../../../authentication/services/driver.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-driver-page',
  imports: [
    RouterOutlet,
    SideBarComponent
  ],
  templateUrl: './driver-page.component.html',
  styleUrl: './driver-page.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DriverPageComponent implements OnInit {
  showLanguageSwitcher: boolean = false;
  driver?: Driver;

  constructor(private driverService:DriverService, private router: Router) {}

  ngOnInit(){
    const userData=localStorage.getItem('user');
    if(userData){
      const {id,role}=JSON.parse(userData);
      if(role==='driver'){
        this.driverService.getById(id).subscribe(data=>{
          this.driver=data;
        })
      }
    }
    // Detectar ruta activa
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showLanguageSwitcher = event.url === '/driver-page/config';
    });
  }
  driverOptions = [
    { class: 'profile-button', link: '/driver-page/profile', src: '/img/profile-icon.png' },
    { class: 'home-button', link: '/driver-page/home', src: '/img/home-icon.png' },
    { class: 'requests-button', link: '/driver-page/requests-sent', src: '/img/request-icon.png' },
    { class: 'wa-button', link: '/driver-page/requests-received', src: '/img/reparation-icon.png' },
    { class: 'config-button', link: '/driver-page/config', src: '/img/config-icon.png' }
  ];
}
