import { Component, State, Listen, Prop } from '@stencil/core';
import { animeList } from '../../helpers/graphql.queries';
import { presentAlert } from '../../helpers/utils';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Prop({ connect: 'ion-alert-controller' })
  alertCtrl: HTMLIonAlertControllerElement;

  @State() animes   = [];
  @State() pageInfo: any;
  @State() searchQuery = 'a';
  @State() loadingItems = [];
  @State() setup = {
    search: '',
    page: 0,
    perPage: 0
  };

  @Listen('ionInput')
  ionInputHandler(event) {
    if (event.detail.target) {
      this.searchQuery = event.detail.target.value;
    }
  }

  @Listen('ionInfinite')
  ionInfiniteHandler() {
    const infiniteScroll: any = document.getElementById('infinite-scroll');
    // If there are more animes to load
    if (this.pageInfo.hasNextPage) {
      // Get the actual setup and load the next page
      let variables = this.setup;
      this.setup.page = this.setup.page + 1;
      this.getAnimes(variables);
      infiniteScroll.complete();
    } else {
      // No more animes to load
      presentAlert(this.alertCtrl, 'Oops!', 'There aren\'t more results.');
      infiniteScroll.complete();
    }
  }

  componentWillLoad() {
    // Skeleton items while loading
    for (let i = 0; i < 10; i++) {
      this.loadingItems.push(
        <ion-item>
          <ion-avatar slot="start">
          </ion-avatar>
          <ion-skeleton-text></ion-skeleton-text>
        </ion-item>
      );
    }
    // Default search query
    var variables = {
      search: this.searchQuery,
      page: 1,
      perPage: 15
    };
    // Save default setup and load animes
    this.setup = variables;
    this.getAnimes(variables);
  }

  goSearch(e) {
    e.preventDefault();
    // If the user typed on the searchbar
    if (this.searchQuery && this.searchQuery.length > 3) {
      var variables = {
        search: this.searchQuery,
        page: 1,
        perPage: 15
      };
      // Clean up the animes, save the new setup and load animes
      this.animes = [];
      this.setup = variables;
      this.getAnimes(variables);
    }
  }

  async getAnimes(variables) {
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

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.data.Page.media.length !== 0) {
      data.data.Page.media.map(element => {
        this.animes.push(<home-item anime={element}></home-item>);
      });
      this.pageInfo = data.data.Page.pageInfo;
    } else {
      presentAlert(this.alertCtrl, 'Oops!', 'Didn\'t find results for that search, try again.');
    }
  }

  render() {
    return [
        <ion-header md-height='56px'>
          <ion-toolbar color="primary">
            <ion-title>AniDB</ion-title>
          </ion-toolbar>
          <ion-toolbar color="primary">
            <form onSubmit={(e) => this.goSearch(e)}>
              <ion-searchbar></ion-searchbar>
              <input class="submit-button" type="submit" value="Submit"/>
            </form>
          </ion-toolbar>
        </ion-header>,
        <ion-content>
          {this.animes.length !== 0
            ?
            (<ion-list>
                {this.animes}
            </ion-list>)
            :
            (<ion-list>
              {this.loadingItems}
            </ion-list>)
          }
          <ion-infinite-scroll id="infinite-scroll">
            <ion-infinite-scroll-content></ion-infinite-scroll-content>
          </ion-infinite-scroll>
        </ion-content>
    ];
  }
}
