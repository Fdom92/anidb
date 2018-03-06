import { Component, State, Listen, Prop } from '@stencil/core';
import { animeList } from '../../helpers/graphql.queries';
import { AlertController } from '@ionic/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() animes   = [];
  @State() pageInfo = {};
  @State() value = '';

  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: AlertController;

  @Listen('ionInput')
  ionInputHandler(event) {
    if (event.detail.target) {
      this.value = event.detail.target.value;
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
        } else {
          this.presentAlert();
        }
      })
      .catch(console.error);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      title: 'Oops!',
      message: 'Didn\'t find results for that search, try again.',
      buttons: ['OK']
    });
    return await alert.present();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.value && this.value.length > 3) {
      var variables = {
        search: this.value,
        page: 1,
        perPage: 15
      };

      this.getAnimes(variables);
    }
  }

  render() {
    return (
      <ion-page class='break-fix show-page'>
        <ion-header md-height='56px'>
          <ion-toolbar>
            <ion-title text-center>AniDB</ion-title>
            <form onSubmit={(e) => this.handleSubmit(e)}>
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
            <ion-skeleton-text></ion-skeleton-text>
          }
        </ion-content>
      </ion-page>
    );
  }
}
