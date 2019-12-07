import { toastController } from '@ionic/core';
import { Component, Listen, h } from '@stencil/core';
import { setDarkMode, setDefaultMode } from '../../helpers/utils';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.css'
})
export class MyApp {

  @Listen('swUpdate', { target: 'window' })
  async onSWUpdate() {
    const toast = await toastController.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload'
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }

  componentWillLoad() {
    const settings = localStorage.getItem('AniDB_Settings');
    let isDarkThemeChecked = false;
    if (settings) {
      isDarkThemeChecked = JSON.parse(settings).darkTheme;
    }
    if (isDarkThemeChecked) {
      setDarkMode();
    } else {
      setDefaultMode();
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url='/' component='app-home'></ion-route>
          <ion-route url='/favorites' component='app-favorites'></ion-route>
          <ion-route url='/settings' component='app-settings'></ion-route>
          <ion-route url='/details/:animeId' component='app-details'></ion-route>
        </ion-router>
        <ion-split-pane content-id="menu-content">
          <ion-menu content-id="menu-content">
            <ion-header>
              <ion-toolbar color="primary">
                <ion-title>Menu</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <ion-list>
                <ion-menu-toggle>
                  <ion-item href={'/'}>Search</ion-item>
                </ion-menu-toggle>
                <ion-menu-toggle>
                  <ion-item href={'/favorites'}>Favorites</ion-item>
                </ion-menu-toggle>
                <ion-menu-toggle>
                  <ion-item href={'/settings'}>Settings</ion-item>
                </ion-menu-toggle>
              </ion-list>
            </ion-content>
          </ion-menu>
          <ion-content id="menu-content">
            <ion-nav />
          </ion-content>
        </ion-split-pane>
      </ion-app>
    );
  }
}
