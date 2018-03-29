import { Component, Prop, State, Element } from '@stencil/core';
import { animeDetails } from '../../helpers/graphql.queries';

@Component({
  tag: 'app-details',
  styleUrl: 'app-details.scss'
})
export class AppDetails {

  @Element() el: Element;

  @State() anime: any;
  // Getting the id as prop from the ion nav
  @Prop() id: string;

  componentWillLoad() {
    this.loadDetails();
  }

  async loadDetails() {
    var query = animeDetails;

    var variables = {
      id: this.id
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

    const response = await fetch(url, options);
    const data = await response.json();

    const animeData = data.data.Media;
    this.anime = <anime-details anime={animeData}></anime-details>;
  }

  goBack() {
    // Nav back to previous page
    this.el.closest('ion-nav').pop();
  }

  render() {
    return (
      <ion-page class='show-page'>
        <ion-header md-height='56px'>
          <ion-toolbar>
            <ion-buttons slot='start'>
              <ion-back-button defaultHref='/'/>
            </ion-buttons>
            <ion-title>AniDB</ion-title>
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
