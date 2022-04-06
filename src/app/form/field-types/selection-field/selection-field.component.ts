import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractFieldComponent } from '../abstract-field/abstract-field.component';

@Component({
  selector: 'app-selection-field',
  templateUrl: './selection-field.component.html',
  styleUrls: ['./selection-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionFieldComponent extends AbstractFieldComponent implements OnInit, OnDestroy {
  @Input()
  public selections: string[] = [];

  @HostListener('document:click', ['$event'])
  public onClickOutHintList(event: Event): void {
    if (
      this.input &&
      this.input.nativeElement &&
      this.input.nativeElement.isSameNode(event.target as HTMLElement)
    ) {
      return;
    }

    this.hideSelectionList();
  }

  public isSelectionListVisible = false;

  @ViewChild('selectionInput')
  private input: ElementRef<HTMLInputElement>;

  private unsubscribe$ = new Subject<void>();

  public ngOnInit(): void {
    this.subscribeToChangeInputValue();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public hideSelectionList(): void {
    this.isSelectionListVisible = false;
  }

  public showSelectionList(): void {
    this.isSelectionListVisible = true;
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public check(event: Event): void {
    const checkBox = event.target as HTMLInputElement;
    if (checkBox.checked) {
      this.addSelectionToControl(checkBox.name);
      return;
    }
    this.removeSelectionFromControl(checkBox.name);
  }

  private addSelectionToControl(newSelection: string) {
    this.control.patchValue([...this.control.value, newSelection]);
  }

  private removeSelectionFromControl(removedSelection: string) {
    const selections = this.control.value as string[];
    this.control.patchValue(selections.filter((selection) => selection !== removedSelection));
  }

  private subscribeToChangeInputValue() {
    this.control.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        map((selections) => {
          return selections.length ? `Выбраны ${selections.length}` : '';
        }),
      )
      .subscribe((stringForInput) => {
        this.input.nativeElement.value = stringForInput;
      });
  }
}
