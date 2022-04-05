import { Component, OnInit } from '@angular/core';
import { ShipsFiltersFormControl } from 'src/app/form/enums/ships-filters-form-control.enum';
import { ShipsFiltersForm } from 'src/app/form/models/ships-filters-form.model';

@Component({
  selector: 'app-ships-filters-form',
  templateUrl: './ships-filters-form.component.html',
  styleUrls: ['./ships-filters-form.component.scss'],
})
export class ShipsFiltersFormComponent implements OnInit {
  public shipNameFormControlName = ShipsFiltersFormControl.ShipName;

  public portsFormControlName = ShipsFiltersFormControl.Ports;

  public shipsFiltersForm: ShipsFiltersForm = null;

  public ports = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];

  public ngOnInit(): void {
    this.createForm();
    //TODO remove subscribe on valueChanges
    this.shipsFiltersForm.valueChanges.subscribe((val) => console.log(val));
  }

  private createForm(): void {
    this.shipsFiltersForm = new ShipsFiltersForm({
      [ShipsFiltersFormControl.ShipName]: '',
      [ShipsFiltersFormControl.Ports]: [],
      [ShipsFiltersFormControl.Type]: '',
    });
  }
}
