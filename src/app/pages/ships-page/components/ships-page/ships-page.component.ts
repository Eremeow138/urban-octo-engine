import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ships-page',
  templateUrl: './ships-page.component.html',
  styleUrls: ['./ships-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsPageComponent {}
