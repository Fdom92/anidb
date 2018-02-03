import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { animeDetails } from '../../helpers/graphql.queries';

@Component({
  tag: 'app-details',
  styleUrl: 'app-details.scss'
})
export class AppDetails {

  @State() anime: any;
  @Prop() match: MatchResults;

  componentWillLoad() {
    var query = animeDetails;

    var variables = {
      id: this.match.params.id
    };

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
        const animeData = data.data.Page.media[0];
        this.anime = <anime-details anime={animeData}></anime-details>;
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
          <div>
            {this.anime
            ? this.anime
            : <p></p>
            }
          </div>
        </ion-content>
      </ion-page>
    );
  }
}
