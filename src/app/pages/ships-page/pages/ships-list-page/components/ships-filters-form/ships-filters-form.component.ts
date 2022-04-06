import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShipsFiltersFormControl } from 'src/app/form/enums/ships-filters-form-control.enum';
import { ShipsFiltersForm } from 'src/app/form/models/ships-filters-form.model';
import { ShipsFiltersFormValue } from 'src/app/form/types/ships-filters-form-value';

@Component({
  selector: 'app-ships-filters-form',
  templateUrl: './ships-filters-form.component.html',
  styleUrls: ['./ships-filters-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipsFiltersFormComponent implements OnInit, OnDestroy {
  public shipNameFormControlName = ShipsFiltersFormControl.ShipName;

  public portsFormControlName = ShipsFiltersFormControl.Ports;

  public typesFormControlName = ShipsFiltersFormControl.Type;

  public shipsFiltersForm: ShipsFiltersForm = null;

  public ports = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];

  public types = ['Barge', 'Cargo', 'High Speed Craft', 'Tug'];

  private unsubscribe$ = new Subject<void>();

  @Output()
  private filtersValuesChangedEvent = new EventEmitter<ShipsFiltersFormValue>();

  public filtersValuesEmit(shipsFilters: ShipsFiltersFormValue): void {
    this.filtersValuesChangedEvent.emit(shipsFilters);
  }

  public ngOnInit(): void {
    this.createForm();
    this.subscribeToEmitFilters();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private createForm(): void {
    this.shipsFiltersForm = new ShipsFiltersForm({
      [ShipsFiltersFormControl.ShipName]: '',
      [ShipsFiltersFormControl.Ports]: [],
      [ShipsFiltersFormControl.Type]: '',
    });
  }

  private subscribeToEmitFilters() {
    this.shipsFiltersForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((formValue: ShipsFiltersFormValue) => {
        formValue.ports.sort();
        this.filtersValuesEmit(formValue);
      });
  }
}
