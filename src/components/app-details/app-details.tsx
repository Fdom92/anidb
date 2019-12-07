import { loadingController } from '@ionic/core';
import { Component, Element, h, Prop, State } from '@stencil/core';
import { animeDetails } from '../../helpers/graphql.queries';

@Component({
  tag: 'app-details',
  styleUrl: 'app-details.css'
})
export class AppDetails {

  @Element() el: Element;

  @State() anime: any;
  @State() animeData: any;
  @State() isFav: boolean;
  // Getting the id as prop from the ion nav
  @Prop() animeId: string;

  componentWillLoad() {
    this.loadDetails();
  }

  async loadDetails() {
    var query = animeDetails;

    var variables = {
      id: this.animeId
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

    const loading: HTMLIonLoadingElement = await loadingController.create({
      message: 'Loading Details...'
    });
    loading.present();
    const response = await fetch(url, options);
    const { data } = await response.json();
    loading.dismiss();

    const animeData = data.Media;
    this.animeData = animeData;
    this.checkFav();
    this.anime = <anime-details anime={animeData}></anime-details>;
  }

  checkFav() {
    const currentFavs = localStorage.getItem('AniDB_Favorites');
    const favItems: any[] = JSON.parse(currentFavs).list;
    const filteredList = favItems.filter(favItem => favItem.id === this.animeData.id);
    if (filteredList.length === 0) {
      this.isFav = false;
    } else {
      this.isFav = true;
    }
  }

  addFav() {
    this.isFav = true;
    const currentFavs = localStorage.getItem('AniDB_Favorites');
    if (currentFavs) {
      const favItems: any[] = JSON.parse(currentFavs).list;
      localStorage.setItem('AniDB_Favorites', JSON.stringify({
        list: [
          ...favItems,
          {
            id: this.animeData.id,
            avatar: this.animeData.coverImage.medium,
            title: this.animeData.title.romaji
          }
        ]
      }));
    } else {
      localStorage.setItem('AniDB_Favorites', JSON.stringify({
        list: [
          {
            id: this.animeData.id,
            avatar: this.animeData.coverImage.medium,
            title: this.animeData.title.romaji
          }
        ]
      }));
    }
  }

  removeFav() {
    this.isFav = false;
    const currentFavs = localStorage.getItem('AniDB_Favorites');
    if (currentFavs) {
      const favItems: any[] = JSON.parse(currentFavs).list;
      localStorage.removeItem('AniDB_Favorites');
      const filteredList = favItems.filter(favItem => favItem.id !== this.animeData.id);
      if (filteredList.length === 0) {
        localStorage.setItem('AniDB_Favorites', JSON.stringify({ list: [] }));
      } else {
        localStorage.setItem('AniDB_Favorites', JSON.stringify({ list: [...filteredList] }));
      }
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-buttons slot='start'>
            <ion-back-button defaultHref='/' />
          </ion-buttons>
          <ion-title>AniDB</ion-title>
          <ion-buttons slot='end'>
            {
              this.isFav ?
                (<ion-button onClick={() => this.removeFav()}>
                  <ion-icon name="heart"></ion-icon>
                </ion-button>) :
                (<ion-button onClick={() => this.addFav()}>
                  <ion-icon name="heart-empty"></ion-icon>
                </ion-button>)
            }
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <div>
          {this.anime}
        </div>
      </ion-content>
    ];
  }
}
