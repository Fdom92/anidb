import { Component, State, Listen } from '@stencil/core';
import { animeList } from '../../helpers/graphql.queries';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() animes   = [];
  @State() pageInfo = {};

  @Listen('ionInput')
  ionInputHandler(event) {
    if (event.detail.target && event.detail.target.value.length > 8) {
      var variables = {
        search: event.detail.target.value,
        page: 1,
        perPage: 15
      };

      this.getAnimes(variables);
    }
  }

  componentWillLoad() {
    this.searchDefaultAnimes();
  }

  searchDefaultAnimes() {
    var variables = {
      search: 'a',
      page: 1,
      perPage: 15
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
        if (data.data.Page.media.length > 1) {
          this.animes = data.data.Page.media.map(element => {
            return (<home-item anime={element}></home-item>);
          });
          this.pageInfo = data.data.Page.pageInfo;
        }
      })
      .catch(console.error);
  }

  render() {
    return (
      <ion-page class='break-fix show-page'>
        <ion-header md-height='56px'>
          <ion-toolbar>
            <ion-title text-center>AniDB</ion-title>
            <ion-searchbar></ion-searchbar>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          {this.animes.length !== 0
            ?
            (<ion-list>
                {this.animes}
            </ion-list>)
            :
            <ion-skeleton-text></ion-skeleton-text>
          }
        </ion-content>
      </ion-page>
    );
  }
}
