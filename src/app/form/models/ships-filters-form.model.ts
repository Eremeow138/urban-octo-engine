import { FormControl } from '@angular/forms';
import { ShipsFiltersFormValue } from '../types/ships-filters-form-value';
import { AbstractForm } from './abstract-form.model';

export class ShipsFiltersForm extends AbstractForm {
  constructor(fields: ShipsFiltersFormValue) {
    super();
    this.createControls(fields);
  }

  public createControls(fields: ShipsFiltersFormValue): void {
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        const initValue = fields[key as keyof ShipsFiltersFormValue];
        const field = new FormControl(initValue);
        this.setControl(key, field);
      }
    }
  }
}
