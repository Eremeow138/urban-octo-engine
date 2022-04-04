import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShip } from 'src/app/pages/ships-page/ships/interfaces/ship.interface';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss'],
})
export class ShipsListComponent {
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
