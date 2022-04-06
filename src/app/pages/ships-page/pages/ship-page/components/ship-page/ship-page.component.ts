import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterPath } from 'src/app/commons/enums/router-path.enum';
import { ITableRow } from 'src/app/commons/interfaces/table-row.interface';
import { IShipFull } from 'src/app/pages/ships-page/ships/interfaces/ship-full.interface';
import { ShipsService } from 'src/app/pages/ships-page/ships/services/ships.service';

@Component({
  selector: 'app-ship-page',
  templateUrl: './ship-page.component.html',
  styleUrls: ['./ship-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipPageComponent implements OnInit, OnDestroy {
  public ship: IShipFull | null = null;

  public tableRows: ITableRow[] | null = null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private shipsService: ShipsService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.subscribeToGettingShip();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getMissions(): string {
    if (!this.ship) {
      return '';
    }
    return this.ship?.missions.reduce((string, currentMission, index, array) => {
      const returns = string + currentMission.name;
      if (index === array.length - 1) {
        return returns;
      }
      return returns + ', ';
    }, '');
  }

  public navigateToShipsListPage(): void {
    this.router.navigateByUrl(`/${RouterPath.ShipsListPage}`);
  }

  private subscribeToGettingShip(): void {
    this.shipsService
      .getShipById(this.route.snapshot.params.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((ship) => {
        this.ship = ship;
        this.tableRows = [
          {
            cells: [
              'Тип',
              ship.type ? ship.type : 'No data',
              'Порт',
              ship.home_port ? ship.home_port : 'No data',
            ],
          },
          {
            cells: [
              'Вес',
              `${ship.weight_kg ? ship.weight_kg : 'No data'}`,
              'Год',
              `${ship.year_built ? ship.year_built : 'No data'}`,
            ],
          },
          { cells: ['Миссии'] },
          {
            cells: [this.getMissions() ? this.getMissions() : 'No data'],
            colspan: 4,
            cellClasses: 'table__cell_blue table__cell_only-bottom-padding',
          },
        ];
        this.cd.markForCheck();
      });
  }
}
