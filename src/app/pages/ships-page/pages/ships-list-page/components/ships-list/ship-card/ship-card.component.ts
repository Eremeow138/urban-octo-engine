import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IShip } from 'src/app/pages/ships-page/ships/interfaces/ship.interface';

@Component({
  selector: 'app-ship-card',
  templateUrl: './ship-card.component.html',
  styleUrls: ['./ship-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipCardComponent {
  @Input()
  public ship: IShip | null = null;

  @Output()
  private goInsideEvent = new EventEmitter<string>();

  public goInside(): void {
    if (this.ship) {
      this.goInsideEvent.emit(this.ship.id);
    }
  }
}
