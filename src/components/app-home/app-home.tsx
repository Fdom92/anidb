import { Component, State, Listen } from '@stencil/core';
import { animeList } from '../../helpers/graphql.queries';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() animes   = [];
  @State() pageInfo = {};

  componentWillLoad() {
    var variables = {
      averageScore_greater: 80,
      page: 1,
      perPage: 20
    };

    this.getAnimes(variables);
  }

  getAnimes(variables) {
    var query = animeList;

    var url = 'https://graphql.anilist.co',
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            variables: variables
          })
        };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        this.animes = data.data.Page.media.map(element => {
          return (<anime-item anime={element}></anime-item>);
        });
        this.pageInfo = data.data.Page.pageInfo;
      })
      .catch(console.error);
  }

  render() {
    return (
      <ion-page class='show-page'>
        <ion-header md-height='56px'>
          <ion-toolbar>
            <ion-title text-center>AniDB</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
          {this.animes.length !== 0
            ? this.animes
            : <p>Loading animes...</p>
          }
          </ion-list>
        </ion-content>
      </ion-page>
    );
  }
}
