import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractFieldComponent } from '../abstract-field/abstract-field.component';

@Component({
  selector: 'app-radiobutton-field',
  templateUrl: './radiobutton-field.component.html',
  styleUrls: ['./radiobutton-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadiobuttonFieldComponent extends AbstractFieldComponent {
  @Input()
  public choices: string[] = [];

  @Input()
  public name = '';

  public pick(event: Event): void {
    const radiobutton = event.target as HTMLInputElement;
    this.control.patchValue(radiobutton.value);
  }
}
