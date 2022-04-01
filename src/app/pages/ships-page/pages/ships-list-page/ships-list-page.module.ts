import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsListPageComponent } from './components/ships-list-page/ships-list-page.component';
import { ShipListPageRoutingModule } from './ships-list-page-routing.module';

const COMPONENTS = [ShipsListPageComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ShipListPageRoutingModule],
  exports: [...COMPONENTS],
})
export class ShipsListPageModule {}
