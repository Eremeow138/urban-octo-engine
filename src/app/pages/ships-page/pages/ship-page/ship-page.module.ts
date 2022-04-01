import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipPageComponent } from './components/ship-page/ship-page.component';
import { ShipPageRoutingModule } from './ship-page-routing.module';

const COMPONENTS = [ShipPageComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ShipPageRoutingModule],
  exports: [...COMPONENTS],
})
export class ShipPageModule {}
