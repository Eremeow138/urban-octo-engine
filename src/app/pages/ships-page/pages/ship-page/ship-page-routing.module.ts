import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipPageComponent } from './components/ship-page/ship-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShipPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipPageRoutingModule {}
