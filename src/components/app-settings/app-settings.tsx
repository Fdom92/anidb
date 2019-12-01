import { Component, h, State } from '@stencil/core';
import { setDarkMode, setDefaultMode } from '../../helpers/utils';

@Component({
  tag: 'app-settings',
  styleUrl: 'app-settings.css'
})
export class AppSettings {

  @State() isDarkThemeChecked: boolean;

  componentWillLoad() {
    const settings = localStorage.getItem('AniDB_Settings');
    if (settings) {
      this.isDarkThemeChecked = JSON.parse(settings).darkTheme;
    } else {
      this.isDarkThemeChecked = false;
    }
    if (this.isDarkThemeChecked) {
      setDarkMode();
    } else {
      setDefaultMode();
    }
  }

  onChangeDark(ev: CustomEvent) {
    this.isDarkThemeChecked = ev.detail.checked;
    localStorage.setItem('AniDB_Settings', JSON.stringify({ darkTheme: ev.detail.checked }));
    if (this.isDarkThemeChecked) {
      setDarkMode();
    } else {
      setDefaultMode();
    }
  }

  render() {
    return [
      <ion-header md-height='56px'>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>Dark Theme</ion-label>
            <ion-toggle onIonChange={(ev) => this.onChangeDark(ev)} checked={this.isDarkThemeChecked} slot="end" value="darkTheme"></ion-toggle>
          </ion-item>
        </ion-list>
      </ion-content>
    ];
  }
}
