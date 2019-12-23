import { Component, h, State } from "@stencil/core";

@Component({
  tag: "app-favorites",
  styleUrl: "app-favorites.css"
})
export class AppFavorites {
  @State() favItems: any = [];

  componentWillLoad() {
    const favorites = localStorage.getItem("AniDB_Favorites");
    if (favorites) {
      const items = JSON.parse(favorites).list;
      if (items.length > 0) {
        items.map((item: any) => {
          this.favItems.push(
            <ion-item href={`/details/${item.id}`}>
              <ion-avatar slot="start">
                <lazy-avatar src={item.avatar} alt="anime avatar" />
              </ion-avatar>
              <p>{item.title}</p>
            </ion-item>
          );
        });
      } else {
        const items = [
          <ion-item class="no-items">
            <p>
              To add favorites here, just go to any anime info and click the{" "}
              <ion-icon name="heart"></ion-icon>
            </p>
          </ion-item>
        ];
        this.favItems = items;
      }
    } else {
      const items = [
        <ion-item class="no-items">
          <p>
            To add favorites here, just go to any anime info and click the{" "}
            <ion-icon name="heart"></ion-icon>
          </p>
        </ion-item>
      ];
      this.favItems = items;
    }
  }

  render() {
    return [
      <ion-header md-height="56px">
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Favorites</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-list>
          <ion-list>{this.favItems}</ion-list>
        </ion-list>
      </ion-content>
    ];
  }
}
