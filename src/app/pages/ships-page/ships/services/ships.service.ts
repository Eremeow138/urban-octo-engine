import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShipsFiltersFormValue } from 'src/app/form/types/ships-filters-form-value';
import { apolloSettings } from 'src/settings/settings';
import { IShipFullResponse } from '../interfaces/ship-full-response';
import { IShipFull } from '../interfaces/ship-full.interface';
import { IShipResponse } from '../interfaces/ship-response';
import { IShip } from '../interfaces/ship.interface';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  private apollo: ApolloBase;

  private getShipsQuery = gql`
    query allShips($offset: Int, $limit: Int, $shipName: String, $port: String, $type: String) {
      ships(
        offset: $offset
        limit: $limit
        find: { home_port: $port, name: $shipName, type: $type }
      ) {
        id
        home_port
        name
        type
      }
    }
  `;

  private getShipQuery = gql`
    query ShipById($id: ID!) {
      ship(id: $id) {
        id
        home_port
        name
        type
        weight_kg
        year_built
        missions {
          name
        }
      }
    }
  `;

  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use(apolloSettings.clientNames.spaceXClient);
  }

  public getShips(offset = 0, limit = 0, shipName = '', port = '', type = ''): Observable<IShip[]> {
    return this.apollo
      .query<IShipResponse>({
        query: this.getShipsQuery,
        variables: {
          offset,
          limit,
          shipName,
          port,
          type,
        },
      })
      .pipe(map((app: ApolloQueryResult<IShipResponse>) => app.data.ships));
  }

  public filterShips(
    offset = 0,
    limit = 0,
    find: ShipsFiltersFormValue = { shipName: '', ports: [''], type: '' },
  ): Observable<IShip[]> {
    if (find.ports.length > 1) {
      const requestsArr = find.ports.map((port) =>
        this.getShips(0, Infinity, find.shipName, port, find.type),
      );
      return forkJoin(requestsArr).pipe(
        map((reqArr) => reqArr.flat(1).slice(offset, offset + limit)),
      );
    }
    return this.getShips(offset, limit, find.shipName, find.ports[0], find.type);
  }

  public getShipById(id: string): Observable<IShipFull> {
    return this.apollo
      .query<IShipFullResponse>({
        query: this.getShipQuery,
        variables: {
          id,
        },
      })
      .pipe(map((app: ApolloQueryResult<IShipFullResponse>) => app.data.ship));
  }
}
