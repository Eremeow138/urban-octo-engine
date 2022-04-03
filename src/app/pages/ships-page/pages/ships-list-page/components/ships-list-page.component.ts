import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IShip } from '../../../ships/interfaces/ship.interface';
import { ShipsService } from '../../../ships/services/ships.service';

@Component({
  selector: 'app-ships-list-page',
  templateUrl: './ships-list-page.component.html',
  styleUrls: ['./ships-list-page.component.scss'],
})
export class ShipsListPageComponent implements OnInit {
  public ships$: Observable<IShip[]> | null = null;

  public itemsPerPage = 5;

  public currentPage = 0;

  public isNextPageExist = true;

  public isPreviousPageExist = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shipsService: ShipsService,
  ) {}

  ngOnInit() {
    this.getShips();
  }

  public fetchNext() {
    this.currentPage++;
    this.isPreviousPageExist = true;
    this.getShips();
  }

  public fetchPrevious() {
    this.currentPage--;
    this.isNextPageExist = true;
    this.ships$ = this.shipsService
      .getShips(this.currentPage * this.itemsPerPage, this.itemsPerPage + 1)
      .pipe(
        tap(() => {
          if (this.currentPage === 0) {
            this.isPreviousPageExist = false;
          }
        }),
        map((ships) => {
          const popedShips = ships.filter((ship, index) => index < ships.length - 1);
          return popedShips;
        }),
      );
  }

  public redirectToShipPage(shipId: number): void {
    this.router.navigate([shipId], { relativeTo: this.route });
  }

  private getShips(): void {
    this.ships$ = this.shipsService
      .getShips(this.currentPage * this.itemsPerPage, this.itemsPerPage + 1)
      .pipe(
        map((ships) => {
          if (ships.length > this.itemsPerPage) {
            const popedShips = ships.filter((ship, index) => index < ships.length - 1);
            this.isNextPageExist = true;
            return popedShips;
          }
          this.isNextPageExist = false;
          return ships;
        }),
      );
  }
}
