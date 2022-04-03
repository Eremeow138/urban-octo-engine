import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apolloSettings } from 'src/settings/settings';
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
}
