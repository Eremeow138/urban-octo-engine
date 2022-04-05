import { ShipsFiltersFormControl } from '../enums/ships-filters-form-control.enum';

export type ShipsFiltersFormValue = {
  [ShipsFiltersFormControl.ShipName]: string;
  [ShipsFiltersFormControl.Ports]: string[];
  [ShipsFiltersFormControl.Type]: string;
};
