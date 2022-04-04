import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipsPageComponent } from './components/ships-page/ships-page.component';
import { ShipsPageRoutingModule } from './ships-page-routing.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [ShipsPageComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, ShipsPageRoutingModule],
  exports: [...COMPONENTS],
})
export class ShipsPageModule {}
