import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideBarComponent} from '../../../../shared/components/side-bar/side-bar.component';
import {MechanicService} from '../../../authentication/services/mechanic.service';
import {Mechanic} from '../../../authentication/models/mechanic.entity';

@Component({
  selector: 'app-mechanic-page',
  imports: [

    SideBarComponent,
    RouterOutlet
  ],
  templateUrl: './mechanic-page.component.html',
  styleUrl: './mechanic-page.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MechanicPageComponent implements OnInit {
  mechanic?: Mechanic;

  constructor(private mechanicService:MechanicService) {}

  ngOnInit(){
    const userData=localStorage.getItem('user');
    if(userData){
      const {id,role}=JSON.parse(userData);
      if(role==='mechanic'){
        this.mechanicService.getById(id).subscribe(data=>{
          this.mechanic=data;
        })
      }
    }
  }
  mechanicOptions = [
    { class: 'profile-button', link: '/mechanic-page/profile', src: '/img/profile-icon.png' },
    { class: 'home-button', link: '/mechanic-page/home', src: '/img/home-icon.png' },
    { class: 'sent-button', link: '/mechanic-page/requests-sent', src: '/img/recomendation-sended-icon.png' },
    { class: 'requests-button', link: '/mechanic-page/requests-received', src: '/img/request-icon.png' },
    { class: 'inventory-button', link: '/mechanic-page/storage', src: '/img/inventory-icon.png' },
    { class: 'config-button', link: '/mechanic-page/config', src: '/img/config-icon.png' }
  ];
}
