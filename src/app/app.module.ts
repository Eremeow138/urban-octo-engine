import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { apolloSettings } from 'src/settings/settings';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ApolloModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: (httpLink: HttpLink): NamedOptions => {
        return {
          [apolloSettings.clientNames.spaceXClient]: {
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: apolloSettings.uries.spaceXUri,
            }),
          },
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
