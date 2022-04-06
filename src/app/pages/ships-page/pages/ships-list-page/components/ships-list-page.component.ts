import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ShipsFiltersFormValue } from 'src/app/form/types/ships-filters-form-value';
import { IShip } from '../../../ships/interfaces/ship.interface';
import { ShipsService } from '../../../ships/services/ships.service';

@Component({
  selector: 'app-ships-list-page',
  templateUrl: './ships-list-page.component.html',
  styleUrls: ['./ships-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsListPageComponent implements OnInit, OnDestroy {
  public ships: IShip[] = [];

  public itemsPerPage = 5;

  public currentPage = 0;

  public isNextPageExist = true;

  public isPreviousPageExist = false;

  private unsubscribe$ = new Subject<void>();

  private filterShips$ = new Subject<ShipsFiltersFormValue>();

  private filterShips: ShipsFiltersFormValue = { shipName: '', ports: [''], type: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shipsService: ShipsService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscribeToGetShips();

    this.subscribeToGettingFilteredShips();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.filterShips$.complete();
  }

  public filter(filtersValues: ShipsFiltersFormValue) {
    this.filterShips$.next(filtersValues);
  }

  public fetchNext() {
    this.currentPage++;
    this.isPreviousPageExist = true;
    this.subscribeToGetShips();
  }

  public fetchPrevious() {
    this.currentPage--;
    this.isNextPageExist = true;
    this.shipsService
      .filterShips(this.currentPage * this.itemsPerPage, this.itemsPerPage + 1, this.filterShips)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
          if (this.currentPage === 0) {
            this.isPreviousPageExist = false;
          }
        }),
        map((ships) => {
          const popedShips = ships.filter((ship, index) => index < ships.length - 1);
          return popedShips;
        }),
      )
      .subscribe((ships) => {
        this.ships = ships;
        this.cd.markForCheck();
      });
  }

  public redirectToShipPage(shipId: string): void {
    this.router.navigate([shipId], { relativeTo: this.route });
  }

  private getShipsAndResolvePagination(): Observable<IShip[]> {
    return this.shipsService
      .filterShips(this.currentPage * this.itemsPerPage, this.itemsPerPage + 1, this.filterShips)
      .pipe(
        takeUntil(this.unsubscribe$),
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

  private subscribeToGetShips(): void {
    this.getShipsAndResolvePagination()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ships) => {
        this.ships = ships;
        this.cd.markForCheck();
      });
  }

  private subscribeToGettingFilteredShips(): void {
    this.filterShips$
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(300),
        distinctUntilChanged(),
        tap((filtersValues) => {
          this.filterShips = filtersValues;
          this.currentPage = 0;
          this.isPreviousPageExist = false;
        }),
        switchMap(() => this.getShipsAndResolvePagination()),
      )
      .subscribe((ships) => {
        this.ships = ships;
        this.cd.markForCheck();
      });
  }
}
