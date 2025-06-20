import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.entity';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  imageMap: Record<string, string> = {
    'Castrol GTX Full Synthetic': 'https://i.postimg.cc/MTtZYLxx/aceite-de-motor-5w-30-castrol-gtx-full-synthetic.png',
    'Mobil 1 Extended Performance': 'https://i.postimg.cc/nh7HWrZ3/aceite-de-motor-5w-30-mobil-1-extended-performance.png',
    'Denso VFK20F': 'https://i.postimg.cc/0Ns81vyP/bujias-denso-vfk20f.png',
    'NGK BKR9EIX 5689': 'https://i.postimg.cc/W4ws2ydr/bujias-ngk-bkr9eix-5689.png',
    'Fram PH7317': 'https://i.postimg.cc/1tRs4KFd/filtro-de-aceite-fram-ph7317.png',
    'Mobil 1 M1-102': 'https://i.postimg.cc/j2mbg01V/filtro-de-aceite-mobil-1-m1-102.png',
    'Arcan ALJ3T Aluminum': 'https://i.postimg.cc/DyRv5LVW/gato-hidraulico-arcan-alj3t-aluminum.png',
    'Harbor Freight Daytona 3T': 'https://i.postimg.cc/436xYdSY/gato-hidraulico-harbor-freight-daytona-3.png',
    'Milwaukee M18': 'https://i.postimg.cc/Fz7vVsDg/llave-de-impacto-milwaukee-m18.png',
    'Ryobi 18V One+': 'https://i.postimg.cc/DZCFGbdw/llave-de-impacto-ryobi-18-v-one.png',
    'ACDelco 3500 HD 11-19': 'https://i.postimg.cc/3NcKsDdc/pastillas-de-freno-ACDELCO-3500-HD-11-19.png',
    'Brembo P50108N': 'https://i.postimg.cc/MZPKMgdm/pastillas-de-freno-brembo-p50108n.png',
    'Ancel AD310': 'https://i.postimg.cc/3Jkrg9q5/scanner-obd-2-ancel-ad310.webp',
    'Autel MaxiCOM MK808': 'https://i.postimg.cc/vTBY2vHn/scanner-obd-2-autel-maxicom-mk808.png'
  };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    const inventoryId = localStorage.getItem('selectedInventoryId');
    if (inventoryId) {
      this.itemService.getAll().subscribe(items => {
        this.items = items.filter(item => item.inventoryId === Number(inventoryId));
      });
    }
  }

  getImage(description: string): string {
    return this.imageMap[description] || 'https://via.placeholder.com/150';
  }
}
