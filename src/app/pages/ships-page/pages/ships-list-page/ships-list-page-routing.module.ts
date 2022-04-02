import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsListPageComponent } from './components/ships-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShipsListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipListPageRoutingModule {}
