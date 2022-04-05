import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive()
export abstract class AbstractFieldComponent {
  @Input()
  public placeholder = '';

  @Input()
  public control: FormControl = null;
}
