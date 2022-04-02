import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IShip } from '../../../ships/interfaces/ship.interface';

@Component({
  selector: 'app-ships-list-page',
  templateUrl: './ships-list-page.component.html',
  styleUrls: ['./ships-list-page.component.scss'],
})
export class ShipsListPageComponent {
  public ships: IShip[] | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  public redirectToShipPage(shipId: number): void {
    this.router.navigate([shipId], { relativeTo: this.route });
  }
}
