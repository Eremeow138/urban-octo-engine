import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterPath } from 'src/app/commons/enums/router-path.enum';
import { ShipsPageComponent } from './components/ships-page/ships-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShipsPageComponent,
    children: [
      {
        path: RouterPath.ShipsListPage,
        pathMatch: 'full',
        loadChildren: () =>
          import('./pages/ships-list-page/ships-list-page.module').then(
            (m) => m.ShipsListPageModule,
          ),
      },
      {
        path: RouterPath.ShipPage,
        loadChildren: () =>
          import('./pages/ship-page/ship-page.module').then((m) => m.ShipPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipsPageRoutingModule {}
