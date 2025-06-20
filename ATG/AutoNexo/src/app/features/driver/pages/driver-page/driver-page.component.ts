import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, RouterOutlet} from "@angular/router";
import {SideBarComponent} from "../../../../shared/components/side-bar/side-bar.component";
import {Driver} from '../../../authentication/models/driver.entity';
import {DriverService} from '../../../authentication/services/driver.service';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';
import {filter} from 'rxjs';

@Component({
  selector: 'app-driver-page',
  imports: [
    RouterOutlet,
    SideBarComponent,
    NgIf
  ],
  templateUrl: './driver-page.component.html',
  styleUrl: './driver-page.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DriverPageComponent implements OnInit {
  driver?: Driver;
  isMainPage: boolean = false;

  constructor(private driverService:DriverService, private router: Router) {}

  ngOnInit(){
    this.isMainPage = this.router.url === '/driver-page';
    const userData=localStorage.getItem('user');
    if(userData){
      const {id,role}=JSON.parse(userData);
      if(role==='driver'){
        this.driverService.getById(id).subscribe(data=>{
          this.driver=data;
        })
      }
    }
    // Suscribirse a los eventos de navegaciÃ³n
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isMainPage = event.urlAfterRedirects === '/driver-page';
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
