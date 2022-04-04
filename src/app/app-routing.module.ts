import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterPath } from './commons/enums/router-path.enum';

const routes: Routes = [
  {
    path: RouterPath.ShipsPage,
    loadChildren: () =>
      import('./pages/ships-page/ships-page.module').then((m) => m.ShipsPageModule),
  },
  { path: '', redirectTo: RouterPath.ShipsPage, pathMatch: 'full' },

  { path: '**', redirectTo: RouterPath.ShipsPage, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
