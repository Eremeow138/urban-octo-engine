import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    query allShips($offset: Int, $limit: Int) {
      ships(offset: $offset, limit: $limit) {
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

  getShips(offset: number, limit: number): Observable<IShip[]> {
    return this.apollo
      .query<IShipResponse>({
        query: this.getShipsQuery,
        variables: {
          offset,
          limit,
        },
      })
      .pipe(map((app: ApolloQueryResult<IShipResponse>) => app.data.ships));
  }

  getShipById(id: string): Observable<IShipFull> {
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
