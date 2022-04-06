import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IShip } from 'src/app/pages/ships-page/ships/interfaces/ship.interface';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsListComponent implements OnChanges {
  @Input()
  public ships: IShip[] | null = null;

  @Input()
  public currentPage: number | null = null;

  @Input()
  public isPreviousPageExist: boolean | null = null;

  @Input()
  public isNextPageExist: boolean | null = null;

  @Output()
  private goInsideEvent = new EventEmitter<string>();

  @Output()
  private nextPageEvent = new EventEmitter<string>();

  @Output()
  private previousPageEvent = new EventEmitter<string>();

  public isNoDataMessageVisible = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ships) {
      if (this.ships.length === 0) {
        this.isNoDataMessageVisible = true;
      } else {
        this.isNoDataMessageVisible = false;
      }
    }
  }

  public goInside(shipId: string): void {
    this.goInsideEvent.emit(shipId);
  }

  public nextPage(): void {
    this.nextPageEvent.emit();
  }

  public previousPage(): void {
    this.previousPageEvent.emit();
  }
}
