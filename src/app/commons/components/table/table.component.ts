import { Component, Input } from '@angular/core';
import { ITableRow } from '../../interfaces/table-row.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input()
  public tableRows: ITableRow[] | null = null;
}
