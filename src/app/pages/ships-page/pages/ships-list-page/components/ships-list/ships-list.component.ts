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

  @Output()
  private goInsideEvent = new EventEmitter<string>();

  public goInside(shipId: string): void {
    this.goInsideEvent.emit(shipId);
  }
}
