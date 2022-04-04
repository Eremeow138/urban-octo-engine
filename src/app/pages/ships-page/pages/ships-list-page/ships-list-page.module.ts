import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipListPageRoutingModule } from './ships-list-page-routing.module';
import { ShipsListPageComponent } from './components/ships-list-page.component';
import { ShipsListComponent } from './components/ships-list/ships-list.component';
import { ShipCardComponent } from './components/ships-list/ship-card/ship-card.component';
import { CommonsModule } from 'src/app/commons/commons.module';

const COMPONENTS = [ShipsListPageComponent];

@NgModule({
  declarations: [...COMPONENTS, ShipsListComponent, ShipCardComponent],
  imports: [CommonModule, CommonsModule, ShipListPageRoutingModule],
  exports: [...COMPONENTS],
})
export class ShipsListPageModule {}
