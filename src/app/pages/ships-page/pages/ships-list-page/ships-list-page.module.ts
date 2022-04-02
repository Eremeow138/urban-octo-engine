import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipListPageRoutingModule } from './ships-list-page-routing.module';
import { ShipsListPageComponent } from './components/ships-list-page.component';
import { ShipsListComponent } from './components/ships-list/ships-list.component';

const COMPONENTS = [ShipsListPageComponent];

@NgModule({
  declarations: [...COMPONENTS, ShipsListComponent],
  imports: [CommonModule, ShipListPageRoutingModule],
  exports: [...COMPONENTS],
})
export class ShipsListPageModule {}
