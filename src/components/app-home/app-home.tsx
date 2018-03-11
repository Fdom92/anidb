import { Component, State, Listen, Prop } from '@stencil/core';
import { animeList } from '../../helpers/graphql.queries';
import { AlertController } from '@ionic/core';
import { presentAlert } from '../../helpers/utils';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() animes   = [];
  @State() pageInfo: any;
  @State() searchQuery = 'a';
  @State() loadingItems = [];
  @State() didSearch = false;

  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: AlertController;

  @Listen('ionInput')
  ionInputHandler(event) {
    if (event.detail.target) {
      this.searchQuery = event.detail.target.value;
    }
  }

  @Listen('ionInfinite')
  ionInfiniteHandler() {
    const infiniteScroll: any = document.getElementById('infinite-scroll');
    if (this.pageInfo.hasNextPage) {
      let variables = {
        search: this.searchQuery,
        page: this.pageInfo.currentPage + 1,
        perPage: 15
      };
      this.getAnimes(variables);
      infiniteScroll.complete();
    } else {
      presentAlert(this.alertCtrl, 'Oops!', 'There aren\'t more results.');
      infiniteScroll.complete();
    }
  }

  componentWillLoad() {
    for (let i = 0; i < 10; i++) {
      this.loadingItems.push(
        <ion-item>
          <ion-avatar slot="start">
          </ion-avatar>
          <ion-skeleton-text></ion-skeleton-text>
        </ion-item>
      );
    }

    var variables = {
      search: 'a',
      page: 1,
      perPage: 15
    };

    this.getAnimes(variables);
  }

  goSearch(e) {
    e.preventDefault();
    if (this.searchQuery && this.searchQuery.length > 3) {

      this.didSearch = true;
      var variables = {
        search: this.searchQuery,
        page: 1,
        perPage: 15
      };

      this.getAnimes(variables);
    }
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
        if (data.data.Page.media.length !== 0) {
          if (this.didSearch) {
            this.animes = data.data.Page.media.map(element => {
              return (<home-item anime={element}></home-item>);
            });
            this.didSearch = false;
          } else {
            data.data.Page.media.map(element => {
              this.animes.push(<home-item anime={element}></home-item>);
            });
          }
          this.pageInfo = data.data.Page.pageInfo;
        } else {
          presentAlert(this.alertCtrl, 'Oops!', 'Didn\'t find results for that search, try again.');
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
            <form onSubmit={(e) => this.goSearch(e)}>
              <ion-searchbar></ion-searchbar>
              <input class="submit-button" type="submit" value="Submit"/>
            </form>
          </ion-toolbar>
        </ion-header>

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
      </ion-page>
    );
  }
}
