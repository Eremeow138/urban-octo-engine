import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipPageComponent } from './components/ship-page/ship-page.component';
import { ShipPageRoutingModule } from './ship-page-routing.module';
import { CommonsModule } from 'src/app/commons/commons.module';

const COMPONENTS = [ShipPageComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, CommonsModule, ShipPageRoutingModule],
  exports: [...COMPONENTS],
})
export class ShipPageModule {}
