import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipListPageRoutingModule } from './ships-list-page-routing.module';
import { ShipsListPageComponent } from './components/ships-list-page.component';

const COMPONENTS = [ShipsListPageComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ShipListPageRoutingModule],
  exports: [...COMPONENTS],
})
export class ShipsListPageModule {}
